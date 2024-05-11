import prismadb from "@/lib/prismadb";
import { kpis } from "../../index";

export const insertData = async () => {
    try {
        const createdItems = await prismadb.kpi.createMany({
            data: kpis
        })
    }
    catch (err) {
        console.log(err);
    }
}

