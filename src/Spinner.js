//import react from 'react';
import { Loader,Dimmer } from 'semantic-ui-react';

const Spinner  = ()  =>(
    <Dimmer active>
    <Loader size = "Huge" content ={"Preparing Chat ....."} />
    </Dimmer>
)

export default Spinner ;
