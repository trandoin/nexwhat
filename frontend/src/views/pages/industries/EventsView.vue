<script setup lang="ts">
import IndustryPageTemplate, { type UseCase, type FaqItem, type SimMessage } from './IndustryPageTemplate.vue'

const useCases: UseCase[] = [
  {
    title: 'Instant Ticket QR Code Delivery',
    desc: 'Deliver digital conference badges and concert entry tickets with scan-ready QR codes directly to WhatsApp the moment checkout completes.',
    metric: '99%',
    metricLabel: 'Ticket Delivery Rate'
  },
  {
    title: 'Automated 1-Hour Reminder Broadcasts',
    desc: 'Send countdown alerts, venue parking guides, Wi-Fi passwords, and speaker schedules right before the event begins to maximize live turnout.',
    metric: '48%',
    metricLabel: 'Higher Live Attendance'
  },
  {
    title: 'Interactive Q&A and Live Polls',
    desc: 'Allow audience members to submit questions to stage speakers and vote on live interactive polls using WhatsApp chatbot keywords.',
    metric: '72%',
    metricLabel: 'Audience Engagement'
  },
  {
    title: 'Post-Event Feedback & Presentation Slides',
    desc: 'Automatically distribute speaker presentation slides, video recordings, and collect NPS feedback within 1 hour of event conclusion.',
    metric: '5.2x',
    metricLabel: 'Higher Feedback Submissions'
  }
]

const chatSimulator: SimMessage[] = [
  {
    sender: 'bot',
    text: 'Hey Ananya! 🎟️ You are confirmed for AI Summit India 2026! Here is your VIP Pass with QR entry code: [QR-9842.png]',
    time: '08:45 AM',
    buttons: ['View Venue & Parking 📍', 'Explore Speaker Agenda 🗓️', 'Add to Calendar ⏰']
  },
  {
    sender: 'user',
    text: 'Explore Speaker Agenda 🗓️',
    time: '08:46 AM'
  },
  {
    sender: 'bot',
    text: 'Keynote starts at 10:00 AM on Main Stage: "Autonomous AI in Production" by Dr. Aris Thorne. Live stream link will be sent 10 mins prior.',
    time: '08:46 AM'
  }
]

const faqs: FaqItem[] = [
  {
    q: 'Can we send QR code tickets to 10,000+ attendees at once?',
    a: 'Yes, our high-throughput WhatsApp broadcast engine easily handles tens of thousands of personalized image and QR code messages in minutes.'
  },
  {
    q: 'Can we integrate ticket booking platforms like Eventbrite or Townscript?',
    a: 'Yes! Using NexWhat webhooks or Zapier/Make integrations, new registrations instantly trigger ticket delivery on WhatsApp.'
  },
  {
    q: 'What if an attendee loses their ticket on the event day?',
    a: 'They can simply reply "TICKET" to your official WhatsApp number, and our chatbot instantly re-sends their QR entry pass in seconds.'
  }
]
</script>

<template>
  <IndustryPageTemplate
    industry-key="events"
    badge-text="Events, Summits & Webinars"
    title="Deliver QR Tickets & Boost Event Attendance to 90%+ on WhatsApp"
    subtitle="Send instant digital entry passes, automate reminder countdowns, and run live audience polls with 0% markup."
    description="Engineered for event organizers, conference producers, webinar hosts, and concert promoters. Deliver QR entry tickets, reduce no-shows with timely alerts, and engage attendees in real time on official WhatsApp Cloud API."
    hero-metric-number="48%"
    hero-metric-label="Increase in Live Attendance"
    :use-cases="useCases"
    :chat-simulator="chatSimulator"
    :faqs="faqs"
  />
</template>
