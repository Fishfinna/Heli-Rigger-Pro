import React, { useState } from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";
import styles from "../../styles/globalStyles";
import PopUp from "../../components/popUp";

export default function SettingsScreen({ navigation }) {
  const listValues = [
    {
      name: "About",
      icon: "information-circle",
      actions: () => setAboutModal(true),
    },
    {
      name: "Help",
      icon: "help-circle",
      actions: () => setHelpModal(true),
    },
    {
      name: "Edit Presets",
      icon: "pencil",
      actions: () => navigation.navigate("Edit Presets"),
    },
  ];

  // modal controls
  const [aboutModal, setAboutModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);

  return (
    <View>
      {/* set up for the about model */}
      <PopUp visible={aboutModal}>
        <View style={styles.popUpNotify}>
          <Text onPress={() => setAboutModal(false)}>
            <Icon name="close" color="black" />
          </Text>

          <Text style={{ padding: 10 }}>
            <Text style={styles.title}>About</Text>
            {"\n\n"}
            Heli Rigger Pro is an industrial calculator for the efficient
            measuring and weighing of lumber. {"\n\n\n"}
            Created with the use of React Native code architectures by Shanti
            Stein-Gagnon, 2022.
          </Text>
        </View>
      </PopUp>

      {/* set up for the Help model */}
      <PopUp visible={helpModal}>
        <View style={styles.popUpNotify}>
          <Text onPress={() => setHelpModal(false)}>
            <Icon name="close" color="black" />
          </Text>

          <Text style={{ padding: 10 }}>
            <Text style={styles.title}>help</Text>
            {"\n\n"}
            Weigh: This section contains Frustum calculations. Please specify
            the length(m), base(cm), and top(cm) diamenter of your object, then
            select a density your wish to apply. {"\n\n"}
            Convert: This section with automatically convert values between
            units. {"\n\n"}
            For Technical Assistance, please email shanti.steingagnon@gmail.com.
          </Text>
        </View>
      </PopUp>

      {/* generates the lists  */}
      {listValues.map((l, i) => (
        <ListItem key={i} bottomDivider onPress={l.actions}>
          <ListItem.Content>
            <View
              style={{
                color: "#434A5D",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Text>
                <Icon name={l.icon} color="#F78D6C" type="ionicon" />
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  marginHorizontal: 10,
                  color: "#434A5D",
                }}
              >
                {l.name}
              </Text>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
