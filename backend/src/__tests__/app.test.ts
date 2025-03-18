import request from "supertest";

import app from "../app.ts";

let bearer = ""

describe('Authentication', () => {

    test("Authorization middleware", async () => {
        const res = await request(app).post("/api/get").set('Authorization', "bearer")
        expect(res.status).toBe(403);
    });

    test('login', async () => {
        const res = await request(app).post("/api/login").send({email: "admin@mw.com", password: '1234567'});
        expect(res.status).toEqual(200)
        bearer = res.body
    })

    test('me', async () => {
        const res = await request(app).post("/api/me").send({'accessToken': bearer});
        expect(res.body.email).toEqual("admin@mw.com")
    })


})

describe("Test fluree", () => {

    test("Test post", async () => {
        const res = await request(app).post("/api/post").set('Authorization', bearer).send({
            insert: {
                title: 'test_proj',
                identifier: 123,
                '@type': 'projects',
                start_date: new Date,
                end_date: new Date
            }
        });
        expect(res.status).toBe(200);
    })


    let projId = ""

    test("Test get", async () => {
        const res = await request(app).post("/api/get").set('Authorization', bearer).send({
            "select": {"?s": ["@id", "title", "identifier", "description", "start_date", "end_date"]},
            "where": {"@id": "?s", "@type": "projects"}
        });
        expect(res.status).toBe(200);
        projId = res.body.find((e: { title: string; }) => e.title === 'test_proj')['@id']
    });

    test("Test put", async () => {
        const res = await request(app).post("/api/post").set('Authorization', bearer).send({
            insert: {
                '@id': projId,
                title: 'test_proj1',
            }
        });
        expect(res.status).toBe(200);
    })


    test("Test delete", async () => {
        const res = await request(app).delete("/api/delete").set('Authorization', bearer).send(projId);
        expect(res.status).toBe(200);
    })


});