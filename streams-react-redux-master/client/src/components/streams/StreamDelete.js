import React from 'react';
import Modal from '../Modal';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchStream, deleteStream} from '../../actions';
import history from '../../history';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    
    renderActions() {
        const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteStream(id)}
                    className="ui primary button negative">
                    Delete
                </button>
                <Link to={'/'} className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }
      
    renderTitle() {
        if(!this.props.stream){
            return 'Delete Stream'
        }

        return <div><span style={{color:'red'}}>Delete Stream </span> {this.props.stream.title}</div>
    }

    render() {
        return(
            <Modal 
                title={this.renderTitle()}
                content='Are you sure want to delete this stream?'
                actions={this.renderActions()}
                onDismiss={()=> history.push('/')}
            />
        )
    }
};

const mapStateToProps = (state, ownProps)  => {
    return { 
        stream: state.streams[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, {fetchStream, deleteStream })(StreamDelete);