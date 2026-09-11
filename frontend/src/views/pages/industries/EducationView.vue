<script setup lang="ts">
import IndustryPageTemplate, { type UseCase, type FaqItem, type SimMessage } from './IndustryPageTemplate.vue'

const useCases: UseCase[] = [
  {
    title: 'Instant Admission Inquiry Bot',
    desc: 'Capture student leads from Meta Ads and website forms instantly. Auto-qualify by course interest, budget, and academic qualifications.',
    metric: '4.2x',
    metricLabel: 'Lead Conversion Rate'
  },
  {
    title: 'Automated Fee & EMI Reminders',
    desc: 'Send personalized tuition fee payment alerts with dynamic UPI QR codes and payment gateway links directly to parents and students.',
    metric: '92%',
    metricLabel: 'On-Time Fee Collection'
  },
  {
    title: 'Exam Dates & Timetable Alerts',
    desc: 'Broadcast hall tickets, exam schedules, syllabus updates, and result links with 98% open rates that students never miss.',
    metric: '98%',
    metricLabel: 'Message Open Rate'
  },
  {
    title: 'Webinar & Demo Class Boost',
    desc: 'Automate confirmation messages, 1-hour reminders, and zoom links to ensure maximum turnouts for free demo sessions and masterclasses.',
    metric: '65%',
    metricLabel: 'Demo Class Attendance'
  }
]

const chatSimulator: SimMessage[] = [
  {
    sender: 'user',
    text: 'Hi! I want details about the Full Stack AI Engineering program 🚀',
    time: '11:05 AM'
  },
  {
    sender: 'bot',
    text: 'Welcome to NexTech Academy! 🎓 The 6-month AI Engineering bootcamp starts on Oct 1st. What is your current background?',
    time: '11:05 AM',
    buttons: ['College Student', 'Working Professional', 'Switching Careers']
  },
  {
    sender: 'user',
    text: 'Working Professional',
    time: '11:06 AM'
  },
  {
    sender: 'bot',
    text: 'Great! We offer flexible weekend batches with live mentor guidance. Download the complete curriculum PDF below:',
    time: '11:06 AM',
    buttons: ['Download Syllabus PDF 📥', 'Talk to Academic Counselor', 'Book Free Demo Class']
  }
]

const faqs: FaqItem[] = [
  {
    q: 'Can multiple admission counselors use the same WhatsApp number?',
    a: 'Yes! NexWhat includes a Shared Team Inbox with role-based agent permissions and round-robin lead distribution so your entire sales team can collaborate seamlessly.'
  },
  {
    q: 'Can we send PDF brochures and brochures automatically?',
    a: 'Yes, our visual chatbot builder supports media replies including PDFs, videos, images, and location pins.'
  },
  {
    q: 'Can we integrate with our student CRM (LeadSquared, HubSpot)?',
    a: 'Yes, NexWhat provides inbound and outbound webhooks and REST APIs to sync lead status directly with your CRM.'
  }
]
</script>

<template>
  <IndustryPageTemplate
    industry-key="education"
    badge-text="Education & EdTech"
    title="Drive 4x More Student Admissions on Official WhatsApp Cloud API"
    subtitle="Qualify prospective student inquiries 24/7, automate fee reminders, and boost demo class attendance."
    description="Empower coaching institutes, EdTech platforms, universities, and schools with conversational student enrollment bots, fee payment alerts, and multi-counselor live chat with 0% markup fees."
    hero-metric-number="4.2x"
    hero-metric-label="Higher Lead Qualification"
    :use-cases="useCases"
    :chat-simulator="chatSimulator"
    :faqs="faqs"
  />
</template>
