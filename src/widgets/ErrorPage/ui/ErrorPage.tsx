export const ErrorPage = () => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className="">
            <div>Произошла непредвиденная ошибка</div>
            <button onClick={reloadPage} className="">
                Обновить страницу
            </button>
        </div>
    );
};
