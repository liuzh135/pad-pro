/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';


import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import enUS from '../locale/en_US';
import zhCN from '../locale/zh_CN';
import {addLocaleData, IntlProvider} from 'react-intl';

import {receiveData} from '@/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

addLocaleData([...en, ...zh]);


class Page extends React.Component {
    render() {
        const { auth, language } = this.props;
        console.log('auth--->' + JSON.stringify(auth) + "-->language=" + language.data);
        let localeStr = language.data === 'zhLanguage' ? 'zh' : 'en';
        let messagesStr = language.data === 'zhLanguage' ? zhCN : enUS;
        console.log('localeStr=' + localeStr);//默认 英文
        return (
            <div style={{ height: '100%' }}>
                <IntlProvider locale={localeStr} messages={messagesStr}>
                    {this.props.children}
                </IntlProvider>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { auth = { data: {} }, language = 'zhLanguage' } = state.httpData;
    return { auth, language };
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);