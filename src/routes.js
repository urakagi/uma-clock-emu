import ChampMeet from "@/components/ChampMeet";
import ColosseumEmulator from "@/components/Colosseum";

const routes = [
    {path: '/', redirect: '/colosseum'},
    {path: '/colosseum', component: ColosseumEmulator},
    {path: '/champions-meeting', component: ChampMeet},
]

export default routes