import {NextApiRequest, NextApiResponse} from "next";
import Project from "@/models/project";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body)

    const project: Project = {
        ...body,
        "@type": 'project'
    }

    const transaction = {insert: {...project}};

    const response = await fetch("http://localhost:8000/transact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction, null, 2)
    });


    const data = await response.json();
    res.status(200)
        .json(data)
}

export default handler