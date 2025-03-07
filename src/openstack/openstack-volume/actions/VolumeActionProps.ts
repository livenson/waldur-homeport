import { OpenStackVolume } from '@waldur/api';

export interface VolumeActionProps {
  resource: OpenStackVolume;
  refetch?;
}
