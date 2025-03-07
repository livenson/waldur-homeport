import { OpenStackVolume } from '@waldur/api';
import { translate } from '@waldur/i18n';
import { ActionContext } from '@waldur/resource/actions/types';

export function isBootable(ctx: ActionContext<OpenStackVolume>): string {
  if (ctx.resource.bootable) {
    return translate("System volume couldn't be detached.");
  }
}
