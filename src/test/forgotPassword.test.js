const MOCKDATA = {
    email: "karan.dave@trootech.com",
};

const validation = (email) => {
    if (email === MOCKDATA.email) return true;
    return false;
};

describe("User Validation", () => {
    test("email correct", () => {
        expect(validation("karan.dave@trootech.com")).toBe(true);
    });

    test("email incorrect", () => {
        expect(validation("user@gmail.com")).toBe(false);
    });
});