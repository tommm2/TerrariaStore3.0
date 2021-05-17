<template>
    <div>
        <ul class="steps mt-3">
            <li :class="{'is-complete':status >= 1}" class="step" data-step="1">
                填寫訂單
            </li>
            <li :class="{'is-complete':status >= 2}" class="step" data-step="2">
                確認訂單
            </li>
            <li :class="{'is-complete':status >= 3}" class="step" data-step="3">
                付款完成
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: ['status']
}
</script>
<style lang="scss" scoped>
    $complete: #8fc866;
    $active:#8fc866;
    $mute: #e6e6e6;
    .steps {
        list-style: none;
        margin: 0;
        padding: 0;
        display: table;
        table-layout: fixed;
        width: 100%;
        color: darken($mute, 33%);
        height:4rem;
        .step {
            position: relative;
            display: table-cell;
            text-align: center;
            font-size: 0.875rem;
            color:gray;
            &:before {
                content: attr(data-step);
                display: block;
                margin: 0 auto;
                background: #ffffff;
                border:2px solid $mute;
                color:gray;
                width: 2rem;
                height: 2rem;
                text-align: center;
                margin-bottom: -4.2rem;
                line-height: 1.9rem;
                border-radius: 100%;
                position: relative;
                z-index: 1;
                font-weight:700;
                font-size:1rem;
            }
            &:after {
                content: '';
                position: absolute;
                display: block;
                background: $mute;
                width: 100%;
                height: 0.125rem;
                top: 1rem;
                left: 50%;
            }
            &:last-child:after {
                display: none;
            }
            &.is-complete {
                color:$complete;
                &:before {
                    content:'\2713';
                    color: $complete;
                    background:#fef0e2;
                    border:2px solid $complete;
                }
                &:after {
                    background: $complete;
                }
            }
        }
    }
</style>
