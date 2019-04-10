<style module>
@import 'cloud-ui.vusion/src/components/u-status-icon.vue/module.css';
.icon[name="move"]:before {
    icon-font: url(@/assets/icons/svg/font/list_move.svg);
    color: #fbcc3e;
}
.icon[name="reject"]::before{
    color: #a2b0b7;
    icon-font: url('cloud-ui.vusion/src/components/u-status-icon.vue/icons/error.svg');
}
.icon[name="unused"]::before{
    color: #a2b0b7;
    icon-font: url('@/assets/icons/svg/font/nec-unused.svg');
}
.icon[name="unpaid"]::before {
    color: #bac2cf;
    icon-font: url('@/assets/icons/svg/font/unpaid.svg');
}
.icon[name="refunded"]::before {
    color: #fea237;
    icon-font: url('@/assets/icons/svg/font/unpaid.svg');
}
.icon[name="start"]::before{
    color:#45dbba;
    icon-font: url('@/assets/icons/svg/font/list-start.svg');
}
.icon[name="no_response"]::before{
    color:#ff867f;
    icon-font: url('@/assets/icons/svg/font/list_no_response.svg');
}
.icon[name="speaker"]::before{
    icon-font: url('@/assets/icons/svg/font/speaker.svg');
}
.icon[name="expiring"]:before{
    color: #ffb041;
    icon-font: url('@/assets/icons/svg/font/expiring.svg');
}
.icon[name="expired"]:before{
    color: #a2b0b7;
    icon-font: url('@/assets/icons/svg/font/expired.svg');
}
</style>
<script>
import { UStatusIcon } from 'cloud-ui.vusion';

export default {
    name: 'u-status-icon',
    extends: UStatusIcon,
};
</script>

