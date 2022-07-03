export const doApiCall = async (options) => {
    const {url, ...rest} = options;
    const response = await fetch(url, {
        ...rest
    });

    return response.json();
}