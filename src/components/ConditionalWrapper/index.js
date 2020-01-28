function ConditionalWrapper({ condition, children, wrap }) {
    return condition ? wrap(children) : children;
}

export default ConditionalWrapper;
