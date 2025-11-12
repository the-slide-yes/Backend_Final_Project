import {
    initializeApp,
    cert,
    getApps,
    ServiceAccount,
    AppOptions,
    App,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const getFirebaseConfig: () => AppOptions = (): AppOptions => {
    const { 
        FIREBASE_PROJECT_ID, 
        FIREBASE_CLIENT_EMAIL, 
        FIREBASE_PRIVATE_KEY 
    } = process.env;

    if (
        !FIREBASE_PROJECT_ID || 
        !FIREBASE_CLIENT_EMAIL || 
        !FIREBASE_PRIVATE_KEY 
    ) {
        throw new Error(
            "Missing Firebase configuration. You must include the necessary environment variables please."
        );
    }

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return {
        credentials: cert(serviceAccount)
    } as AppOptions;
};

const initializeFirebaseAdmin: () => App = (): App => {
    // check for existing app
    const firstIndex: number = 0;
    const existingApp: App = getApps()[firstIndex];
    if (existingApp) {
        return existingApp;
    }

    return initializeApp(getFirebaseConfig());
};


const firebaseApp: App = initializeFirebaseAdmin();

const auth: Auth = getAuth(firebaseApp);

const db: Firestore = getFirestore(firebaseApp);

export { auth, db };
