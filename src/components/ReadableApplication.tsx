import * as React from "react";
import Reboot from "material-ui/Reboot";
import Button from "material-ui/Button";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import AppBar from "material-ui/AppBar";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";

class ReadableApplication extends React.Component {
    theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    render() {
        return (
            <MuiThemeProvider theme={this.theme}>
                <Reboot/>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title">
                            Readable
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{margin: "16px"}}>
                    <Grid container
                          direction="column"
                          justify="flex-start"
                          alignItems="stretch">
                        <Grid item>
                            <Paper style={{padding: "16px"}}>
                                <Button variant="raised" color="primary">
                                    Hello World
                                </Button>
                            </Paper>
                        </Grid>

                        <Grid item>
                            <Paper style={{padding: "16px"}}>
                                <Typography>
                                This is some text
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default ReadableApplication;