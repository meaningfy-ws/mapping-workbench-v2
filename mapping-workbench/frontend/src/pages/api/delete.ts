import {NextApiRequest, NextApiResponse} from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id} = JSON.parse(req.body)

    const query = {
        delete: {"@id": id, '?p0': '?o0'},
        where: {"@id": id, '?p0': '?o0'},
    };

    const response = await fetch("http://localhost:8000/transact", {
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