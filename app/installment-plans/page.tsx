import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Installment Plans',
  description:
    'Learn about flexible installment plans and pay-in-parts financing options from Rujama Phones Shop in Kigali.',
  alternates: {
    canonical: '/installment-plans',
  },
};

export default function InstallmentPlansPage() {
  redirect('/pay-in-parts');
}
