import SpinnerLoaderStyles from "./SpinnerLoader.module.css"

const SpinnerLoader = () => {
    return(
        <div className={SpinnerLoaderStyles.loaderWrapper}>
            <div className={SpinnerLoaderStyles.loader}>Loading...</div>
        </div>
    )
}

export default SpinnerLoader