import Head from "next/head";
import Styles from "../styles/Home.module.css"

function loginConfirm() {


    return (
        <div className={Styles.container} > 
            <Head>
                <title>Logden in</title>
            </Head>
            <main  className={Styles.main}>
                <div>
                    <h1 className={Styles.title}>User Logged In </h1>
                </div>
            </main>
            

        </div>
    )
}

/*
export async function getStaticProps() {
    // data fetch
    const userId = token._id 
    const users = await fetch(`http://localhost:3002/api/user/${userId}`)
    const user = await users.json()
    //console.log(user);
    return {
        props: {
            user
        }
    }

}
*/
export default loginConfirm