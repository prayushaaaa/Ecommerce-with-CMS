import prismadb from "@/lib/prismadb";
import PredictionClient from "./components/PredictionClient";

const PredictionPage = () => {
    // const kpiData = await prismadb.kpi.findMany({});

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <PredictionClient />
            </div>
        </div>
    );
};

export default PredictionPage;