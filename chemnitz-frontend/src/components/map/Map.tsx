import dynamic from 'next/dynamic';
import { Feature } from '@/types/Features';

const ClientMap = dynamic(() => import('./ClientMap'), { ssr: false });

export default function Map(props: { features: Feature[], selectedFeatureId: string | null }) {
  return <ClientMap {...props} />;
}
