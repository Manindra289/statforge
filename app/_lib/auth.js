import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { createUser , getUser } from "../_lib/actions";

const authConfig = {
    providers:[
    Google({
        clientId:process.env.AUTH_GOOGLE_ID,
        clientSecret:process.env.AUTH_GOOGLE_SECRET
    }),

    Credentials({
      name: "Demo Account",
      credentials: {},
      async authorize() {
        // Fetch demo user from DB
        const demoUser = await getUser("demouser@gmail.com");
        return demoUser;
      },
    }),


],
    callbacks:{
        authorized({auth,request}){
            return !!auth?.user
        },
        async signIn({user,account,profile}){
            try{
                const existing = await getUser(user.email)
                if(!existing)
                    await createUser({email:user.email,userName : user.name, avatar:user.image})
                return true;
            }
            catch{
                return false;
            }
        },
        async session({session, user}){
            const guest = await getUser(session.user.email)
            session.user.userId = guest.id;
            return session;
        }
    },
    pages :{
        signIn:'/'
    }

};
export const {signIn, signOut ,auth, handlers:{GET, POST}} = NextAuth(authConfig);

// export {handler as GET, handler as POST};
// export const {auth, handlers: {GET,POST},} = NextAuth(authConfig)