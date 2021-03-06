import { FaceRetouchingOffSharp, Stream } from '@mui/icons-material';
import React, { Component } from 'react'
import { Dialog, DialogContentText, TextField, DialogTitle, DialogContent, DialogActions, Alert, } from '@mui/material';
import { Button } from 'react-bootstrap';
import './java.css'
import { ToastContainer, toast } from 'react-toastify';

const axios = require('axios')



const typeoptions = [
    {
        label: "BOOLEAN",
        value: "BOOLEAN"
    },
    {
        label: "BYTE",
        value: "BYTE"
    },
    {
        label: "SHORT",
        value: "SHORT"
    },
    {
        label: "INTEGER",
        value: "INTEGER"
    },
    {
        label: "LONG",
        value: "LONG"
    },
    {
        label: "FLOAT",
        value: "FLOAT"
    },
    {
        label: "DOUBLE",
        value: "DOUBLE"
    },
    {
        label: "STRING",
        value: "STRING"
    },
    {
        label: "GEOMETRY",
        value: "GEOMETRY"
    }

]


const trueOrFalse = [
    {
        label: "False",
        value: "False"
    },
    {
        label: "True",
        value: "True"
    }
]


const ServerConnected = () => {
    toast.success('Server is running ', {
        position: "top-right",
        className: "succesnotify",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
const StreamSuccConnected = () => {
    toast.success('Stream Created Succesffulyy', {
        position: "top-right",
        className: "succesnotify",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
const EventInsertConnected = () => {
    toast.success('Event Inserted Succesfully', {
        position: "top-right",
        className: "succesnotify",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const ServerNotRunning = () => {
    toast.error(' Server is not running', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        ArrayOfAttributes: []
    });
}







// https://dbs-demo.mathematik.uni-marburg.de/native/query


//{

async function insertEvent(streamName, events) {
    const headers = {
        'Content-Type': 'application/json'
    }
    let request = `{
        "streamName": "${streamName}",
        "events": ${events}
      }`
    try {
        const url = 'http://localhost:4000/event'

        const response = await axios.post(url, request,
            { headers: headers })
        console.log(response)
        EventInsertConnected()
    } catch (error) {
        console.error(error)
        alert("it doesnt work")
    }
}



function mina() {
    alert("sdasda")
}



export default class Java extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Streams: [],
            CreateStreamDialog: false,
            StreamName: "",
            AttributeName: "",
            StreamType: "BOOLEAN",
            Nullable: false,
            LightweightIndex: false,
            InsertDialog: false,
            QueryDialog: false,
            streamNameInInsertDialog: "",
            StreamNameInQueryDialog: "",
            ArrayOfAttributes: [],
            SchemaDialog: false,
            SqlSchemaQuery: "",
            resultOfShemaQuery: "",
            xValue: 0.0,
            yValue: 0.0,
            tStart: 0,
            ArrayofEvents: [],
            QueryString: "",
            SystemInfoDialog: false,
            nameStreamInfo: "",
            eventCountSystemInfo: "",
            timeIntervalLower: "null",
            timeIntervalUpper: "null",
            timeIntervalLowerInclusive: "null",
            timeIntervalUpperInclusive: " null",
            schemaSystemInfo: "",
            ShemaDialogData: "",
            ShemaDialogstatus: "",
            ShemaDialogstatusText: "",
            ShemaDialogheaders: "",
            ShemaDialogconfig: "",
            resultOfQuery: ""

        }
    }
    OpenCreateStreamDialog = (id) => {
        this.setState({
            CreateStreamDialog: true,

        })
    }


    InsertTOAttributesArray = (name, type, nullable, index) => {
        this.state.ArrayOfAttributes.push(`{"name":"${name}","type":"${type}","properties" : {"nullable" : ${nullable},"index" : ${index}}}`)
        // alert(this.state.ArrayOfAttributes)
    }

    InsertToEventArray = (xValue, yValue, tStart) => {

        this.state.ArrayofEvents.push(`
{
    "X" : ${xValue},
    "Y" : ${yValue},
    "TSTART" : ${tStart}
}
`)
    }


    streamInfo = async (streamName) => {



        try {
            const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/stream-info'

            const res = await axios(url, {
                params: {
                    name: streamName
                }
            })
            const data1 = await res.data;
            this.setState({
                SystemInfoDialog: true,
                nameStreamInfo: data1.name,
                eventCountSystemInfo: data1.eventCount,
                timeIntervalLower: JSON.stringify(data1.timeInterval.lower),
                timeIntervalUpper: JSON.stringify(data1.timeInterval.upper),
                timeIntervalLowerInclusive: JSON.stringify(data1.timeInterval.lowerInclusive),
                timeIntervalUpperInclusive: JSON.stringify(data1.timeInterval.upperInclusive),
                schemaSystemInfo: JSON.stringify(data1.schema)
            })




            //    alert(JSON.stringify(data1))
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }


    closeSystemInfoDialog = () => {
        this.setState({
            SystemInfoDialog: false
        })
    }


    closeCreateStreamDialog = () => {
        this.setState({
            CreateStreamDialog: false,
            ArrayOfAttributes: []
        }
        )
    }


    OpenInsertDialog = (streamName) => {

        this.setState({
            streamNameInInsertDialog: streamName,
            InsertDialog: true

        }, () => {
        }
        )
        this.state.StreamNameInInsertDialog = streamName
    }


    closeInsertDialog = () => {
        this.setState({
            InsertDialog: false,

        }
        )
    }


    OpenSchemaDialog = () => {
        this.setState({
            SchemaDialog: true,

        }
        )
    }

    changeSqlSchemaQuery = event => {
        this.setState({
            SqlSchemaQuery: event.target.value
        },
            () => {
                //   alert(this.state.SqlSchemaQuery)
            })
    }

    closeSchemaDialog = () => {
        this.setState({
            SchemaDialog: false,
            schemaSystemInfo: "",
            ShemaDialogData: "",
            ShemaDialogstatus: "",
            ShemaDialogstatusText: "",
            ShemaDialogheaders: "",
            ShemaDialogconfig: "",
            SqlSchemaQuery: ""

        })
    }

    OpenQueryDialog = (streamName) => {
        this.setState({

            StreamNameInQueryDialog: streamName,
            QueryDialog: true
        })
        this.state.StreamNameInQueryDialog = streamName
    }
    closeQueryDialog = () => {
        this.setState({
            QueryDialog: false,

        }
        )
    }



    changeNullable = event => {
        this.setState({
            Nullable: event.target.value,
        }, () => {
        }
        )
    }

    changeQueryString = event => {
        this.setState({
            QueryString: event.target.value
        }, () => {
        }
        )
    }


    changeLightweightIndex = event => {
        this.setState({
            LightweightIndex: event.target.value,
        }, () => {
        }
        )
    }


    checkPing = () => {
        this.pingTest()

    }

    pingTest = async () => {
        const fetch1 = await fetch('https://dbs-demo.mathematik.uni-marburg.de/native')
        if (JSON.stringify(fetch1.status) === "200") {
            ServerConnected();
        } else {
            ServerNotRunning();
        }
    }




    changeStreamName = event => {

        this.setState({
            StreamName: event.target.value,
        }, () => {
        }
        )
    }

    changeAttributeName = event => {
        this.setState({
            AttributeName: event.target.value
        })
    }

    changeXvalue = event => {
        this.setState({
            xValue: event.target.value
        },
            () => {
            })
    }
    changeYvalue = event => {
        this.setState({
            yValue: event.target.value
        },
            () => {
            })
    }

    changeTStart = event => {
        this.setState({
            tStart: event.target.value
        },
            () => {
            })
    }




    changeSchemaType = event => {
        this.setState({
            StreamType: event.target.value
        }, () => {
            //   alert(this.state.StreamType)
        }
        )
    }

    changeStartTime = event => {
        this.setState({
            startTime: event.target.value
        }, () => {
        }
        )
    }

    changeEndTime = event => {
        this.setState({
            endTime: event.target.value
        }, () => {
        }


        )

    }




    fetchDataJava = async () => {
        try {
            const fetch1 = await fetch('https://dbs-demo.mathematik.uni-marburg.de/native/get-streams')
            const response1 = await fetch1.json()
            this.setState({ Streams: response1 });
        } catch (error) {
            console.error(error)
        }
    }


    async componentDidMount() {
        setInterval(() => {
            this.fetchDataJava();
        }, 1000);
    }

    query = async (queryString, startTime, endTime) => {
        let request = `{
            "queryString":"${queryString}",
            "startTime": ${startTime},
            "endTime": ${endTime}
     }`
        //      alert(request)
        try {
            const url = 'http://localhost:4000/query'
            const headers = {
                'Content-Type': 'application/json'
            }
            const response = await axios.post(url, request,
                { headers: headers }
            )
            this.setState({
                resultOfQuery: JSON.stringify(response)
            })
            //   alert("fdddd")
        } catch (error) {
            console.error(error)
            alert("it doesn#t word")
        }
    }

    schema = async (queryString) => {
        try {
            const data = `
        {
        "queryString" : "${queryString}"
        }`
            const headers = {
                'Content-Type': 'application/json'
            }
            const response = await axios.post('http://localhost:4000/schema', data, {
                headers: headers
            })
            this.setState({
                resultOfShemaQuery: JSON.stringify(response),
                ShemaDialogData: JSON.stringify(response.data),
                ShemaDialogstatus: JSON.stringify(response.status),
                ShemaDialogstatusText: JSON.stringify(response.statusText),
                ShemaDialogheaders: JSON.stringify(response.headers),
                ShemaDialogconfig: JSON.stringify(response.config)
            })


            //       alert("it worked " + JSON.stringify(response))
            console.log("SDFADSAD")
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }

    createStreamJava = async (streamName, schema) => {

        const data = `{
                    "streamName": "${streamName}",
                    "schema" : ${schema}
                }`

        try {

            const headers = {
                'Content-Type': 'application/json'
            }
            const response = await axios.post('http://localhost:4000/createstream', data,
                { headers: headers }
            )
            StreamSuccConnected()
        } catch (error) {
            alert("it didnt Work", error)
            alert("data is ", data)
            console.log(data)
            console.log(data)
        }
    }








    render() {


        const Listofallstream = this.state.Streams
        return (
            <div className='maindiv'>

                <div className="TableJavadiv" >
                    <div className="TableStreamName"  ><h2>Stream Name</h2></div>
                    <div className="TableCreateStream"  ><button className='CreateStreamButton' onClick={this.OpenCreateStreamDialog}>Create Stream</button>
                        <button onClick={() => this.checkPing()} className='Pingbutton'>Ping</button>
                        <button onClick={() => this.OpenSchemaDialog()} className='Schemabutton'>Schema</button>
                    </div>

                </div>



                <div className='listsOfStreams'>
                    {
                        Listofallstream.map((streamName, index) => {
                            return (
                                <ul className="a">

                                    <li key={streamName.id}>

                                        <div className='StreamNames'>{streamName}</div>


                                        <div className="buttonsdiv" >

                                            <button onClick={() => this.OpenInsertDialog(streamName)} className='InsertButton'> Insert</button>
                                            <button onClick={() => this.OpenQueryDialog(streamName)} className='Query'> Query</button>
                                            <button onClick={() => this.streamInfo(streamName)} className='StreamInfoButton'> Stream info</button>

                                        </div>

                                    </li>
                                </ul>

                            );
                        })
                    }
                </div>


                <Dialog open={this.state.CreateStreamDialog}
                    onClose={this.closeCreateStreamDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle>Create Stream:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            onChange={this.changeStreamName}
                            required
                            id="outlined-required"
                            label="Stream Name"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />
                        <TextField
                            onChange={this.changeAttributeName}
                            sx={{ m: 1, width: '63ch' }}
                            required
                            id="outlined-required"
                            label="Name"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"
                            helperText="Attribute Name!"

                        />


                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Type: "
                            sx={{ m: 1, width: '63ch' }}
                            onChange={this.changeSchemaType}

                            SelectProps={{
                                native: true,
                            }}

                        >
                            {typeoptions.map((option) => (
                                <option value={option.label}>{option.value}</option>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Nullable: "
                            sx={{ m: 1, width: '63ch' }}
                            onChange={this.changeNullable}

                            SelectProps={{
                                native: true,
                            }}

                        >
                            {trueOrFalse.map((option) => (
                                <option value={option.label}>{option.value}</option>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Lightweight Index: "
                            sx={{ m: 1, width: '63ch' }}
                            onChange={this.changeLightweightIndex}

                            SelectProps={{
                                native: true,
                            }}

                        >
                            {trueOrFalse.map((option) => (
                                <option value={option.label}>{option.value}</option>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-read-only-input"
                            label="Attributes"
                            multiline
                            maxRows={6}
                            sx={{ m: 1, width: '130ch' }}


                            variant="filled"
                            helperText="Array of Attributes"
                            value={this.state.ArrayOfAttributes}
                        />



                    </DialogContent>
                    <DialogActions>
                        <Button className="AddAttribute" onClick={() => this.InsertTOAttributesArray(this.state.AttributeName, this.state.StreamType, this.state.Nullable, this.state.LightweightIndex)} >Add Attribute</Button>
                        <Button className="CreateStreamButtonInDialog"
                            onClick={() => this.createStreamJava(this.state.StreamName, JSON.stringify([
                                {
                                    "name": this.state.AttributeName,
                                    "type": this.state.StreamType,
                                    "properties": {
                                        "nullable": this.state.Nullable,
                                        "index": this.state.LightweightIndex
                                    }
                                }
                            ]))}
                        >CreateStream</Button>
                        <Button onClick={this.closeCreateStreamDialog} className="closeDialogButton">Close</Button>

                    </DialogActions>
                </Dialog>


                <Dialog open={this.state.InsertDialog}
                    onClose={this.closeInsertDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h1> Stream Name: {this.state.StreamNameInInsertDialog} </h1>
                        </DialogContentText>

                        <TextField
                            onChange={this.changeXvalue}
                            required
                            sx={{ m: 1, width: '63ch' }}
                            id="outlined-required"
                            label="X"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />
                        <TextField
                            onChange={this.changeYvalue}
                            sx={{ m: 1, width: '63ch' }}
                            required
                            id="outlined-required"
                            label="Y"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />
                        <TextField
                            onChange={this.changeTStart}
                            sx={{ m: 1, width: '63ch' }}
                            required
                            id="outlined-required"
                            label="TStart"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />


                        <TextField
                            id="outlined-read-only-input"
                            label="Events"
                            multiline
                            maxRows={6}
                            sx={{ m: 1, width: '130ch' }}


                            variant="filled"
                            helperText="Added Events"
                            value={this.state.ArrayofEvents}
                        />





                    </DialogContent>
                    <DialogActions>
                        <Button className="CreateStreamButtonInDialog" onClick={() => insertEvent(this.state.streamNameInInsertDialog, JSON.stringify([
                            {
                                xValue: 0.0,
                                "X": this.state.xValue,
                                "Y": this.state.yValue,
                                "TSTART": this.state.tStart
                            }
                        ]))}>Insert</Button>
                        <Button onClick={() => this.InsertToEventArray(this.state.xValue, this.state.yValue, this.state.tStart)} className="AddAttribute">Add to Array</Button>
                        <Button onClick={this.closeInsertDialog} className="closeDialogButton">Close</Button>

                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.QueryDialog}
                    onClose={this.closeQueryDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h1> Stream Name: {this.state.StreamNameInQueryDialog} </h1>

                        </DialogContentText>


                        <TextField
                            onChange={this.changeQueryString}
                            required
                            id="outlined-required"
                            label="Query String"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />

                        <TextField
                            onChange={this.changeStartTime}

                            sx={{ m: 1, width: '63ch' }}
                            id="outlined-required"
                            label="Start Time"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />

                        <TextField
                            onChange={this.changeEndTime}
                            required
                            sx={{ m: 1, width: '63ch' }}
                            id="outlined-required"
                            label="End Time"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />


                        <TextField
                            id="outlined-read-only-input"
                            label="Result"
                            multiline
                            maxRows={6}
                            sx={{ m: 1, width: '130ch' }}


                            variant="filled"
                            helperText="Here will be the answered shown"
                            value={this.state.resultOfQuery}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.query(this.state.QueryString, this.state.startTime, this.state.endTime)} className="CreateStreamButtonInDialog">Excute</Button>
                        <Button onClick={this.closeQueryDialog} className="closeDialogButton">Close</Button>

                    </DialogActions>
                </Dialog>



                <Dialog open={this.state.SchemaDialog}
                    onClose={this.closeInsertDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h1> Please Enter SQL Query</h1>
                        </DialogContentText>

                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="QueryString"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '130ch' }}
                                onChange={this.changeSqlSchemaQuery}
                                variant="filled"
                                helperText=""
                                value={this.state.SqlSchemaQuery}
                            />
                        </div>

                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="data"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '50ch' }}
                                variant="filled"

                                value={this.state.ShemaDialogData}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Status"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '10ch' }}
                                variant="filled"

                                value={this.state.ShemaDialogstatus}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Status Text"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '10ch' }}
                                variant="filled"

                                value={this.state.ShemaDialogstatusText}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Headers"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '50ch' }}
                                variant="filled"

                                value={this.state.ShemaDialogheaders}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Config"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '130ch' }}
                                variant="filled"

                                value={this.state.ShemaDialogconfig}
                            />
                        </div>




                    </DialogContent>
                    <DialogActions>

                        <Button className="ExcuteSchemaButton" onClick={() => this.schema(this.state.SqlSchemaQuery)}>Execute</Button>
                        <Button onClick={this.closeSchemaDialog} className="closeDialogButton">Close</Button>



                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.SystemInfoDialog}
                    onClose={this.closeSystemInfoDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h1> System Info</h1>
                        </DialogContentText>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label=" Stream Name"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '65ch' }}
                                variant="filled"

                                value={this.state.nameStreamInfo}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="eventCount"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '65ch' }}
                                variant="filled"

                                value={this.state.eventCountSystemInfo}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-read-only-input"
                                label="TimeInterval-lower"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '30ch' }}
                                variant="filled"

                                value={this.state.timeIntervalLower}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="timeInterval-upper"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '30ch' }}
                                variant="filled"

                                value={this.state.timeIntervalUpper}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="timeInterval-lowerInclusive"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '30ch' }}
                                variant="filled"

                                value={this.state.timeIntervalLowerInclusive}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="timeInterval-upperInclusive"
                                multiline
                                maxRows={6}
                                sx={{ m: 1, width: '30ch' }}
                                variant="filled"

                                value={this.state.timeIntervalUpperInclusive}
                            />


                        </div>


                        <TextField
                            id="outlined-read-only-input"
                            label="schema"
                            multiline
                            maxRows={6}
                            sx={{ m: 1, width: '65ch' }}
                            variant="filled"

                            value={this.state.schemaSystemInfo}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeSystemInfoDialog} className="closeDialogButton">Close</Button>
                    </DialogActions>
                </Dialog>

                <ToastContainer />
            </div >
        )
    }
}