import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Phone Upgrades',
  description:
    'Explore phone upgrade services from Rujama Phones Shop in Kigali, Rwanda.',
  alternates: {
    canonical: '/phone-upgrades',
  },
};

export default function PhoneUpgradesPage() {
  redirect('/upgrade');
}
