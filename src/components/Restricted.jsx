import React, { Component } from 'react'

export default class Restricted extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quote: undefined,
            author: undefined,
            eth_connected: this.isConnected()
        }
    }

    isConnected() {
        return localStorage.getItem('eth_connected') === 'y'
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    observeStorage() {
        this.setState({ eth_connected: this.isConnected() })
    }

      render() {
        return (
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="nothing-to-show d-flex align-items-center justify-content-center">
                        <div className="card shadow-none bg-transparent">
                            <div className="card-body text-center">
                                <h1 className="display-4 mt-5">{this.state.author}</h1>
                                <p>{this.state.quote}</p>
                                <div className="row">
                                    <div className="col-12 col-lg-12 mx-auto">
                                        <h6 className="mt-3">¡{!this.state.eth_connected ? 'Please connect your wallet' : 'Nothing to show here'}!</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}