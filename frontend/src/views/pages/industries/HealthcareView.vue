<script setup lang="ts">
import IndustryPageTemplate, { type UseCase, type FaqItem, type SimMessage } from './IndustryPageTemplate.vue'

const useCases: UseCase[] = [
  {
    title: 'Doctor Appointment Booking & Rescheduling',
    desc: 'Patients can choose specialty, doctor, clinic location, and available time slot right inside WhatsApp with automated calendar confirmation.',
    metric: '75%',
    metricLabel: 'Reduction in No-Shows'
  },
  {
    title: 'Instant Lab Test Report Delivery',
    desc: 'Deliver diagnostic blood test, MRI, and radiology reports as password-protected PDFs immediately upon approval by lab technicians.',
    metric: '100%',
    metricLabel: 'On-Time Report Delivery'
  },
  {
    title: 'Prescription Refill & Medicine Reminders',
    desc: 'Automate recurring medication reminders for chronic care patients and allow 1-tap prescription reorders with local pharmacy dispatch.',
    metric: '4.1x',
    metricLabel: 'Patient Treatment Adherence'
  },
  {
    title: 'Emergency Triage & Clinic Hotline',
    desc: 'Integrate WhatsApp voice calling with automated multi-tier IVR (Press 1 for OPD, Press 2 for Emergency, Press 3 for Reports).',
    metric: '24/7',
    metricLabel: 'Patient Support Availability'
  }
]

const chatSimulator: SimMessage[] = [
  {
    sender: 'user',
    text: 'Hi, I need an appointment with Dr. Sharma (Cardiology) for this Friday 🩺',
    time: '10:00 AM'
  },
  {
    sender: 'bot',
    text: 'Hello Sneha! Dr. Sharma is available at our Indiranagar branch on Friday. Please select your preferred consultation slot:',
    time: '10:00 AM',
    buttons: ['Friday 11:30 AM', 'Friday 04:00 PM', 'Friday 06:30 PM']
  },
  {
    sender: 'user',
    text: 'Friday 04:00 PM',
    time: '10:01 AM'
  },
  {
    sender: 'bot',
    text: '✅ Appointment Confirmed! Token #18. Clinic location: https://maps.app.goo.gl/hosp. We will send a reminder 2 hours prior.',
    time: '10:01 AM'
  }
]

const faqs: FaqItem[] = [
  {
    q: 'Can patient reports be sent securely via WhatsApp?',
    a: 'Yes, WhatsApp uses 256-bit end-to-end encryption. Reports can also be sent with individual patient password protection (e.g. year of birth).'
  },
  {
    q: 'How can our front-desk reception manage multiple doctors?',
    a: 'Our Shared Team Inbox allows multiple receptionists to handle patient inquiries simultaneously with tags for each doctor and department.'
  },
  {
    q: 'Can patients reschedule or cancel without calling the clinic?',
    a: 'Yes! Automated reminder messages include interactive buttons for "Confirm", "Reschedule", and "Cancel", drastically slashing clinic no-shows.'
  }
]
</script>

<template>
  <IndustryPageTemplate
    industry-key="healthcare"
    badge-text="Healthcare & Hospitals"
    title="Transform Patient Care with Automated WhatsApp Health Workflows"
    subtitle="Book doctor consultations, deliver lab reports instantly, and reduce no-shows by 75% with 0% markup."
    description="Designed for hospitals, multi-specialty clinics, diagnostic labs, and dental centers. Automate appointment bookings, deliver critical lab test results, and provide emergency IVR calling on your verified WhatsApp number."
    hero-metric-number="75%"
    hero-metric-label="Reduction in Patient No-Shows"
    :use-cases="useCases"
    :chat-simulator="chatSimulator"
    :faqs="faqs"
  />
</template>
