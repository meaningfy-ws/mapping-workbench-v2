 const handler = async (req, res) => {
    const {type} = JSON.parse(req.body)

    const query = {
        select: {'?s': ['*']},
        where: {
            "@id": "?s",
            '@type': type,
        },
    };


    console.log('in here handler')

    const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query, null, 2)
    });


    const data = await response.json()

    res.status(200)
        .json(data)
}

export default handler