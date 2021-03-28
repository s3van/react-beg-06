import SpinnerLoaderStyles from "./SpinnerLoader.module.css"

const SpinnerLoader = () => {
    return(
        <div className={SpinnerLoaderStyles.loaderWrapper}>
            <div className={SpinnerLoaderStyles.loader}></div>
        </div>
    )
}

export default SpinnerLoader