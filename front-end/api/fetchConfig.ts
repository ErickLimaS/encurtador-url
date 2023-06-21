export async function getData(url: string, allResponse?: boolean) {

    const res: ServerWithJsonResponse | ServerWithStringResponse = await fetch(url).then((result) => result.json())

    if (!res.success) {
        throw new Error('Failed to fetch data')
    }

    if (allResponse) {

        return res

    }

    return res.response as UrlObjectFromServer
}