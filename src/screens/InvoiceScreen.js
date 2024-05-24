import { useWindowDimensions } from 'react-native';
import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import InvoiceComplete from './InvoiceComplete';
import InvoiceActive from './InvoiceActive';

const renderScene = SceneMap({
    first: InvoiceActive,
    second: InvoiceComplete,
});

export default function InvoiceScreen() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Còn hoạt động' },
        { key: 'second', title: 'Đã xong' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    style={{ backgroundColor: 'transparent' }}
                    labelStyle={{ color: '#f4c95d' }}
                />
            )}
        />
    );
}
