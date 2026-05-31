'use client';

import { useParams } from 'next/navigation';
import ConfigEditor from '@/components/admin/ConfigEditor';

export default function BrandConfigPage() {
  const { brandId } = useParams<{ brandId: string }>();
  
  if (!brandId) {
    return <div className="p-6">Brand ID is required</div>;
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <ConfigEditor brandId={brandId} section="brand" />
    </div>
  );
}