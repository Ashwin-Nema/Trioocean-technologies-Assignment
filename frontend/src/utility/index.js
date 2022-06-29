export const openModalWithVariantAndMessage = ( message ,variant, fixedModalParameters) => {
    const [showModalFunction, setMessageFunction, setVariantFunction] = fixedModalParameters
    setMessageFunction(message)
    setVariantFunction(variant)
    showModalFunction(true)
}