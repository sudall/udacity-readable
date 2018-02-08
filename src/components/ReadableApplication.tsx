import * as React from "react";
import Reboot from "material-ui/Reboot";
import Button from "material-ui/Button";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import AppBar from "material-ui/AppBar";

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

                <Button variant="raised" color="primary">
                    Hello World
                </Button>

                <Typography>
                This is some text
                </Typography>
            </MuiThemeProvider>
        );
    }
}

export default ReadableApplication;