export const UAutoCrumb = {
    name: 'u-auto-crumb',
    watch: {
        $route() {
            this.$forceUpdate();
        },
    },
};

export default UAutoCrumb;
