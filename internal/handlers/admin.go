package handlers

import (
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/shridarpatil/whatomate/internal/models"
	"github.com/valyala/fasthttp"
	"github.com/zerodha/fastglue"
)

// AdminOrgResponse represents organization details for the Super Admin portal
type AdminOrgResponse struct {
	ID                string `json:"id"`
	Name              string `json:"name"`
	Slug              string `json:"slug"`
	Status            string `json:"status"`
	PlanTier          string `json:"plan_tier"`
	CreatedAt         string `json:"created_at"`
	MembersCount      int64  `json:"members_count"`
	ContactsCount     int64  `json:"contacts_count"`
	MessagesSent      int64  `json:"messages_sent"`
	PhoneNumbersCount int64  `json:"phone_numbers_count"`
	WABAID            string `json:"waba_id"`
	PhoneNumberID     string `json:"phone_number_id"`
	SetupRequest      any    `json:"setup_request,omitempty"`
}

// AdminSetupRequestItem represents a concierge linking request
type AdminSetupRequestItem struct {
	ID           string `json:"id"`
	OrgID        string `json:"org_id"`
	BusinessName string `json:"business_name"`
	PhoneNumber  string `json:"phone_number"`
	Channel      string `json:"channel"`
	ChannelLabel string `json:"channel_label"`
	Slot         string `json:"slot"`
	Status       string `json:"status"`
	RequestedAt  string `json:"requested_at"`
	Notes        string `json:"notes"`
}

// Helper to sanitize slug
var nonAlphaNumRegex = regexp.MustCompile(`[^a-z0-9]+`)

func slugify(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	s = nonAlphaNumRegex.ReplaceAllString(s, "-")
	return strings.Trim(s, "-")
}

// GetAdminOverview returns high-level multi-tenant platform metrics
func (a *App) GetAdminOverview(r *fastglue.Request) error {
	var totalOrgs int64
	a.DB.Model(&models.Organization{}).Count(&totalOrgs)

	var totalContacts int64
	a.DB.Model(&models.Contact{}).Count(&totalContacts)

	var totalMessages int64
	a.DB.Model(&models.Message{}).Count(&totalMessages)

	var orgs []models.Organization
	if err := a.DB.Order("created_at desc").Find(&orgs).Error; err != nil {
		a.Log.Error("Failed to fetch organizations for overview", "error", err)
		return r.SendErrorEnvelope(fasthttp.StatusInternalServerError, "Failed to load overview data", nil, "")
	}

	var activeOrgs int64
	var starterCount int64
	var growthCount int64
	var proCount int64
	var estimatedMRR int64
	var pendingRequestsCount int64

	orgResponses := make([]AdminOrgResponse, 0, len(orgs))

	for _, org := range orgs {
		plan := "growth"
		status := "active"
		if org.Settings != nil {
			if p, ok := org.Settings["plan_tier"].(string); ok && p != "" {
				plan = p
			}
			if s, ok := org.Settings["status"].(string); ok && s != "" {
				status = s
			}
			if req, ok := org.Settings["assisted_setup_request"].(map[string]any); ok {
				if reqStatus, _ := req["status"].(string); reqStatus == "pending" {
					pendingRequestsCount++
				}
			}
		}

		switch status {
		case "active":
			activeOrgs++
			switch plan {
			case "starter":
				starterCount++
				estimatedMRR += 299
			case "pro":
				proCount++
				estimatedMRR += 999
			default:
				growthCount++
				estimatedMRR += 599
			}
		case "trial":
			switch plan {
			case "starter":
				starterCount++
			case "pro":
				proCount++
			default:
				growthCount++
			}
		}

		var membersCount int64
		_ = a.DB.Model(&models.User{}).Where("organization_id = ?", org.ID).Count(&membersCount)

		var contactsCount int64
		_ = a.DB.Model(&models.Contact{}).Where("organization_id = ?", org.ID).Count(&contactsCount)

		var messagesCount int64
		_ = a.DB.Model(&models.Message{}).Where("organization_id = ?", org.ID).Count(&messagesCount)

		var waAccounts []models.WhatsAppAccount
		_ = a.DB.Where("organization_id = ?", org.ID).Find(&waAccounts)

		wabaID := ""
		phoneID := ""
		if len(waAccounts) > 0 {
			wabaID = waAccounts[0].BusinessID
			phoneID = waAccounts[0].PhoneID
		}
		if wabaID == "" {
			wabaID = "waba_" + org.ID.String()[:8]
		}

		var setupReq any
		if org.Settings != nil {
			setupReq = org.Settings["assisted_setup_request"]
		}

		orgResponses = append(orgResponses, AdminOrgResponse{
			ID:                org.ID.String(),
			Name:              org.Name,
			Slug:              org.Slug,
			Status:            status,
			PlanTier:          plan,
			CreatedAt:         org.CreatedAt.Format(time.RFC3339),
			MembersCount:      membersCount,
			ContactsCount:     contactsCount,
			MessagesSent:      messagesCount,
			PhoneNumbersCount: int64(len(waAccounts)),
			WABAID:            wabaID,
			PhoneNumberID:     phoneID,
			SetupRequest:      setupReq,
		})
	}

	return r.SendEnvelope(map[string]any{
		"total_orgs":             totalOrgs,
		"active_orgs":            activeOrgs,
		"total_contacts":         totalContacts,
		"total_messages":         totalMessages,
		"estimated_mrr":          estimatedMRR,
		"starter_count":          starterCount,
		"growth_count":           growthCount,
		"pro_count":              proCount,
		"pending_setup_requests": pendingRequestsCount,
		"organizations":          orgResponses,
	})
}

// ListAdminOrganizations returns list of organizations with filters
func (a *App) ListAdminOrganizations(r *fastglue.Request) error {
	search := strings.TrimSpace(string(r.RequestCtx.QueryArgs().Peek("search")))
	statusFilter := strings.TrimSpace(string(r.RequestCtx.QueryArgs().Peek("status")))
	planFilter := strings.TrimSpace(string(r.RequestCtx.QueryArgs().Peek("plan")))

	query := a.DB.Model(&models.Organization{}).Order("created_at desc")
	if search != "" {
		likeTerm := "%" + strings.ToLower(search) + "%"
		query = query.Where("LOWER(name) LIKE ? OR LOWER(slug) LIKE ?", likeTerm, likeTerm)
	}

	var orgs []models.Organization
	if err := query.Find(&orgs).Error; err != nil {
		a.Log.Error("Failed to list organizations", "error", err)
		return r.SendErrorEnvelope(fasthttp.StatusInternalServerError, "Failed to load organizations", nil, "")
	}

	results := make([]AdminOrgResponse, 0, len(orgs))
	for _, org := range orgs {
		plan := "growth"
		status := "active"
		if org.Settings != nil {
			if p, ok := org.Settings["plan_tier"].(string); ok && p != "" {
				plan = p
			}
			if s, ok := org.Settings["status"].(string); ok && s != "" {
				status = s
			}
		}

		if statusFilter != "" && statusFilter != "all" && status != statusFilter {
			continue
		}
		if planFilter != "" && planFilter != "all" && plan != planFilter {
			continue
		}

		var membersCount int64
		_ = a.DB.Model(&models.User{}).Where("organization_id = ?", org.ID).Count(&membersCount)

		var contactsCount int64
		_ = a.DB.Model(&models.Contact{}).Where("organization_id = ?", org.ID).Count(&contactsCount)

		var messagesCount int64
		_ = a.DB.Model(&models.Message{}).Where("organization_id = ?", org.ID).Count(&messagesCount)

		var waAccounts []models.WhatsAppAccount
		_ = a.DB.Where("organization_id = ?", org.ID).Find(&waAccounts)

		wabaID := ""
		phoneID := ""
		if len(waAccounts) > 0 {
			wabaID = waAccounts[0].BusinessID
			phoneID = waAccounts[0].PhoneID
		}
		if wabaID == "" {
			wabaID = "waba_" + org.ID.String()[:8]
		}

		var setupReq any
		if org.Settings != nil {
			setupReq = org.Settings["assisted_setup_request"]
		}

		results = append(results, AdminOrgResponse{
			ID:                org.ID.String(),
			Name:              org.Name,
			Slug:              org.Slug,
			Status:            status,
			PlanTier:          plan,
			CreatedAt:         org.CreatedAt.Format(time.RFC3339),
			MembersCount:      membersCount,
			ContactsCount:     contactsCount,
			MessagesSent:      messagesCount,
			PhoneNumbersCount: int64(len(waAccounts)),
			WABAID:            wabaID,
			PhoneNumberID:     phoneID,
			SetupRequest:      setupReq,
		})
	}

	return r.SendEnvelope(map[string]any{
		"organizations": results,
		"count":         len(results),
	})
}

// CreateAdminOrganization provisions a new tenant organization directly
func (a *App) CreateAdminOrganization(r *fastglue.Request) error {
	var req struct {
		Name     string `json:"name"`
		Slug     string `json:"slug"`
		PlanTier string `json:"plan_tier"`
		Status   string `json:"status"`
	}
	if err := a.decodeRequest(r, &req); err != nil {
		return nil
	}

	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" {
		return r.SendErrorEnvelope(fasthttp.StatusBadRequest, "Organization name is required", nil, "")
	}

	slug := req.Slug
	if slug == "" {
		slug = slugify(req.Name)
	}
	if slug == "" {
		slug = "org-" + uuid.New().String()[:8]
	}

	// Ensure unique slug
	var existingCount int64
	a.DB.Model(&models.Organization{}).Where("slug = ?", slug).Count(&existingCount)
	if existingCount > 0 {
		slug = slug + "-" + uuid.New().String()[:4]
	}

	planTier := req.PlanTier
	if planTier == "" {
		planTier = "growth"
	}
	status := req.Status
	if status == "" {
		status = "active"
	}

	org := models.Organization{
		Name: req.Name,
		Slug: slug,
		Settings: models.JSONB{
			"plan_tier":  planTier,
			"status":     status,
			"created_by": "super_admin",
		},
	}

	if err := a.DB.Create(&org).Error; err != nil {
		a.Log.Error("Failed to create organization from super admin", "error", err)
		return r.SendErrorEnvelope(fasthttp.StatusInternalServerError, "Failed to create organization", nil, "")
	}

	a.Log.Info("Super Admin provisioned new organization", "org_id", org.ID, "name", org.Name, "slug", org.Slug)

	return r.SendEnvelope(AdminOrgResponse{
		ID:                org.ID.String(),
		Name:              org.Name,
		Slug:              org.Slug,
		Status:            status,
		PlanTier:          planTier,
		CreatedAt:         org.CreatedAt.Format(time.RFC3339),
		MembersCount:      0,
		ContactsCount:     0,
		MessagesSent:      0,
		PhoneNumbersCount: 0,
		WABAID:            "waba_" + org.ID.String()[:8],
	})
}

// UpdateAdminOrganization updates an organization's status, plan, or name
func (a *App) UpdateAdminOrganization(r *fastglue.Request) error {
	idStr, _ := r.RequestCtx.UserValue("id").(string)
	orgID, err := uuid.Parse(idStr)
	if err != nil {
		return r.SendErrorEnvelope(fasthttp.StatusBadRequest, "Invalid organization ID", nil, "")
	}

	var req struct {
		Name     *string `json:"name"`
		PlanTier *string `json:"plan_tier"`
		Status   *string `json:"status"`
	}
	if err := a.decodeRequest(r, &req); err != nil {
		return nil
	}

	var org models.Organization
	if err := a.DB.Where("id = ?", orgID).First(&org).Error; err != nil {
		return r.SendErrorEnvelope(fasthttp.StatusNotFound, "Organization not found", nil, "")
	}

	if org.Settings == nil {
		org.Settings = make(models.JSONB)
	}

	if req.Name != nil && strings.TrimSpace(*req.Name) != "" {
		org.Name = strings.TrimSpace(*req.Name)
	}
	if req.PlanTier != nil && *req.PlanTier != "" {
		org.Settings["plan_tier"] = *req.PlanTier
	}
	if req.Status != nil && *req.Status != "" {
		org.Settings["status"] = *req.Status
	}

	if err := a.DB.Save(&org).Error; err != nil {
		a.Log.Error("Failed to update organization", "error", err, "org_id", orgID)
		return r.SendErrorEnvelope(fasthttp.StatusInternalServerError, "Failed to update organization", nil, "")
	}

	plan, _ := org.Settings["plan_tier"].(string)
	if plan == "" {
		plan = "growth"
	}
	status, _ := org.Settings["status"].(string)
	if status == "" {
		status = "active"
	}

	return r.SendEnvelope(map[string]any{
		"success":   true,
		"id":        org.ID.String(),
		"name":      org.Name,
		"plan_tier": plan,
		"status":    status,
	})
}

// AdminLinkWhatsApp directly attaches WhatsApp Cloud API credentials to any organization
func (a *App) AdminLinkWhatsApp(r *fastglue.Request) error {
	idStr, _ := r.RequestCtx.UserValue("id").(string)
	orgID, err := uuid.Parse(idStr)
	if err != nil {
		return r.SendErrorEnvelope(fasthttp.StatusBadRequest, "Invalid organization ID", nil, "")
	}

	var req struct {
		Name               string `json:"name"`
		PhoneID            string `json:"phone_id"`
		BusinessID         string `json:"business_id"`
		AccessToken        string `json:"access_token"`
		AppID              string `json:"app_id"`
		AppSecret          string `json:"app_secret"`
		WebhookVerifyToken string `json:"webhook_verify_token"`
	}
	if err := a.decodeRequest(r, &req); err != nil {
		return nil
	}

	if req.PhoneID == "" || req.BusinessID == "" || req.AccessToken == "" {
		return r.SendErrorEnvelope(fasthttp.StatusBadRequest, "Phone ID, Business ID (WABA ID), and Access Token are required", nil, "")
	}

	name := strings.TrimSpace(req.Name)
	if name == "" {
		name = "Primary WABA (" + req.PhoneID + ")"
	}

	var existing models.WhatsAppAccount
	err = a.DB.Where("organization_id = ? AND (phone_id = ? OR name = ?)", orgID, req.PhoneID, name).First(&existing).Error

	if err == nil {
		// Update existing account
		existing.BusinessID = req.BusinessID
		existing.AccessToken = req.AccessToken
		existing.AppID = req.AppID
		existing.AppSecret = req.AppSecret
		if req.WebhookVerifyToken != "" {
			existing.WebhookVerifyToken = req.WebhookVerifyToken
		}
		_ = a.encryptAccountSecrets(&existing)
		if err := a.DB.Save(&existing).Error; err != nil {
			return r.SendErrorEnvelope(fasthttp.StatusInternalServerError, "Failed to update WhatsApp account", nil, "")
		}
	} else {
		// Create new account
		account := models.WhatsAppAccount{
			OrganizationID:     orgID,
			Name:               name,
			PhoneID:            req.PhoneID,
			BusinessID:         req.BusinessID,
			AccessToken:        req.AccessToken,
			AppID:              req.AppID,
			AppSecret:          req.AppSecret,
			WebhookVerifyToken: req.WebhookVerifyToken,
			IsDefaultIncoming:  true,
			IsDefaultOutgoing:  true,
			Status:             "active",
		}
		_ = a.encryptAccountSecrets(&account)
		if err := a.DB.Create(&account).Error; err != nil {
			return r.SendErrorEnvelope(fasthttp.StatusInternalServerError, "Failed to create WhatsApp account", nil, "")
		}
	}

	// Update concierge setup request to completed if present
	var org models.Organization
	if err := a.DB.Where("id = ?", orgID).First(&org).Error; err == nil && org.Settings != nil {
		if setupReq, ok := org.Settings["assisted_setup_request"].(map[string]any); ok {
			setupReq["status"] = "completed"
			setupReq["resolved_at"] = time.Now().Format(time.RFC3339)
			org.Settings["assisted_setup_request"] = setupReq
			_ = a.DB.Model(&org).Update("settings", org.Settings)
		}
	}

	return r.SendEnvelope(map[string]any{
		"success": true,
		"message": "WhatsApp number and WABA successfully linked to organization.",
	})
}

// ListAdminSetupRequests returns all concierge setup requests
func (a *App) ListAdminSetupRequests(r *fastglue.Request) error {
	var orgs []models.Organization
	if err := a.DB.Find(&orgs).Error; err != nil {
		return r.SendErrorEnvelope(fasthttp.StatusInternalServerError, "Failed to load requests", nil, "")
	}

	var requests []AdminSetupRequestItem
	for _, org := range orgs {
		if org.Settings == nil {
			continue
		}
		rawReq, ok := org.Settings["assisted_setup_request"]
		if !ok || rawReq == nil {
			continue
		}
		reqMap, ok := rawReq.(map[string]any)
		if !ok {
			continue
		}

		bName, _ := reqMap["business_name"].(string)
		if bName == "" {
			bName = org.Name
		}
		phone, _ := reqMap["phone_number"].(string)
		channel, _ := reqMap["contact_channel"].(string)
		slot, _ := reqMap["preferred_slot"].(string)
		notes, _ := reqMap["notes"].(string)
		status, _ := reqMap["status"].(string)
		if status == "" {
			status = "pending"
		}

		channelLabel := "WhatsApp Priority Chat"
		if channel == "meet" {
			channelLabel = "10-Min Google Meet"
		}

		requests = append(requests, AdminSetupRequestItem{
			ID:           "req_" + org.ID.String()[:8],
			OrgID:        org.ID.String(),
			BusinessName: bName,
			PhoneNumber:  phone,
			Channel:      channel,
			ChannelLabel: channelLabel,
			Slot:         slot,
			Status:       status,
			RequestedAt:  org.UpdatedAt.Format(time.RFC3339),
			Notes:        notes,
		})
	}

	return r.SendEnvelope(map[string]any{
		"requests": requests,
		"count":    len(requests),
	})
}

// UpdateAdminSetupRequest updates status of a setup request
func (a *App) UpdateAdminSetupRequest(r *fastglue.Request) error {
	idStr, _ := r.RequestCtx.UserValue("id").(string)
	orgID, err := uuid.Parse(idStr)
	if err != nil {
		return r.SendErrorEnvelope(fasthttp.StatusBadRequest, "Invalid request organization ID", nil, "")
	}

	var req struct {
		Status string `json:"status"` // pending, in_progress, completed
		Notes  string `json:"notes"`
	}
	if err := a.decodeRequest(r, &req); err != nil {
		return nil
	}

	var org models.Organization
	if err := a.DB.Where("id = ?", orgID).First(&org).Error; err != nil {
		return r.SendErrorEnvelope(fasthttp.StatusNotFound, "Organization not found", nil, "")
	}

	if org.Settings == nil {
		org.Settings = make(models.JSONB)
	}

	setupReq, ok := org.Settings["assisted_setup_request"].(map[string]any)
	if !ok || setupReq == nil {
		setupReq = make(map[string]any)
	}

	if req.Status != "" {
		setupReq["status"] = req.Status
	}
	if req.Notes != "" {
		setupReq["resolution_notes"] = req.Notes
	}
	if req.Status == "completed" {
		setupReq["resolved_at"] = time.Now().Format(time.RFC3339)
	}

	org.Settings["assisted_setup_request"] = setupReq
	if err := a.DB.Model(&org).Update("settings", org.Settings).Error; err != nil {
		return r.SendErrorEnvelope(fasthttp.StatusInternalServerError, "Failed to update request", nil, "")
	}

	return r.SendEnvelope(map[string]any{
		"success": true,
		"request": setupReq,
	})
}
