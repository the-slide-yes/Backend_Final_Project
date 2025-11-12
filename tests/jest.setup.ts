// Always mock the firebase in tests, always
jest.mock("../config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
        getUesr: jest.fn(),
    },
    db: {
        collection: jest.fn(),
        runTransaction: jest.fn(),
        batch: jest.fn(),
    },
}));

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});
