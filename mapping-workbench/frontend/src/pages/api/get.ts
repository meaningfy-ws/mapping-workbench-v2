import {NextApiRequest, NextApiResponse} from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {type} = JSON.parse(req.body)

    const query = {
        select: {'?s': ['*']},
        where: {
            "@id": "?s",
            '@type': type,
        },
    };

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