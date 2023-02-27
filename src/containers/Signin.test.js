const MOCKDATA = {
    email: "karan.dave@trootech.com",
    password: "admin@123",
};

const validation = (email, password) => {
    if (email === MOCKDATA.email && password === MOCKDATA.password) return true;
    return false;
};

describe("User Validation", () => {
    test("email/password correct", () => {
        expect(validation("karan.dave@trootech.com", "admin@123")).toBe(true);
    });

    test("email/password incorrect", () => {
        expect(validation("user@gmail.com", "user123")).toBe(false);
    });
});