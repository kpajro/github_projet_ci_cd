const request = require("supertest")
const app = require("./index")

let server
beforeAll(()=>{
    server = app.listen(0, ()=>{
        console.log(`test server running on ${server.address().port}`)
    })
})
afterAll(()=>{
    server.close()
})
describe("API convertion : ", () => {
    it("devrait convertir Celsius en Fahrenheit", async () => {
        const res = await request(app)
        .get("/c/t")
        .query({ val: 25, from: "Celsius", to: "Fahrenheit" })
        expect(res.status).toBe(200)
        expect(res.body.result).toBeCloseTo(77, 1)
    })

    it("devrait convertir Fahrenheit en Celsius", async () => {
        const res = await request(app)
        .get("/c/t")
        .query({ val: 77, from: "Fahrenheit", to: "Celsius" })
        expect(res.status).toBe(200)
        expect(res.body.result).toBeCloseTo(25, 1)
    })

    it("devrait convertir Kilometers en Miles", async () => {
        const res = await request(app)
        .get("/c/d")
        .query({ val: 10, from: "Kilometers", to: "Miles" })
        expect(res.status).toBe(200)
        expect(res.body.result).toBeCloseTo(6.21371, 1)
    })

    it("devrait convertir Miles en Kilometers", async () => {
        const res = await request(app)
        .get("/c/d")
        .query({ val: 6.21371, from: "Miles", to: "Kilometers" })
        expect(res.status).toBe(200)
        expect(res.body.result).toBeCloseTo(10, 1)
    })
    it("devrait convertir Kilograms en Livres", async () => {
        const res = await request(app)
        .get("/c/w")
        .query({ val: 10, from: "Kilograms", to: "Pounds" })
        expect(res.status).toBe(200)
        expect(res.body.result).toBeCloseTo(22.0462, 1)
    })

    it("devrait convertir Livres en Kilogrammes", async () => {
        const res = await request(app)
        .get("/c/w")
        .query({ val: 22.0462, from: "Pounds", to: "Kilograms" })
        expect(res.status).toBe(200)
        expect(res.body.result).toBeCloseTo(10, 1)
    })

    
    it("devrait renvoyer une erreur pour une valeur non numerique", async () => {
        const res = await request(app)
        .get("/c/t")
        .query({ val: "abc", from: "Celsius", to: "Fahrenheit" })
        expect(res.status).toBe(400)
        expect(res.text).toBe("Error: value must be a number")
    })
    
    it("devrait convertir newton en kilogramme-force", async () => {
        const res = await request(app)
        .get("/c/f")
        .query({ val: 100, from: "Newtons", to: "KilogramForce" })
        expect(res.status).toBe(200)
        expect(res.body.result).toBeCloseTo(10.197, 1) 
    })
    
    it("devrait convertir Kilogramme-force en newtons", async () => {
        const res = await request(app)
        .get("/c/f")
        .query({ val: 10, from: "KilogramForce", to: "Newtons" })
        expect(res.status).toBe(200)
        expect(res.body.result).toBeCloseTo(98.0665, 1)
    })
    // test mauvaise convertion
    it("devrait renvoyer une erreur pour une convertion invalide", async () => {
        const res = await request(app)
        .get("/c/t")
        .query({ val: 25, from: "Celsius", to: "Miles" })
        expect(res.status).toBe(400)
        expect(res.text).toBe("invalid convertion")
    })
})

