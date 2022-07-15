import React, { FormEvent } from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import styles from ".././styles/globalStyles";
import { Formik, Form } from "formik";
import FlatButton from "./button.js";
import NumInput from "./numInput.js";

export default function Reviewform({ findNums }) {
  // refresh control
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 250);
  }, []);

  return (
    <View>
      <Formik
        initialValues={{ base: "", top: "", height: "" }}
        onSubmit={(values) => {
          findNums(values);
        }}
      >
        {(props) => (
          <View>
            <NumInput
              text="Base Diameter (D):"
              onChangeText={props.handleChange("base")}
              value={props.values.base}
              format="cm"
            />

            <NumInput
              text="Top Diameter (d):"
              onChangeText={props.handleChange("top")}
              value={props.values.top}
              format="cm"
            />

            <NumInput
              text="Height (h):"
              onChangeText={props.handleChange("height")}
              value={props.values.height}
              format="m"
            />

            <FlatButton
              bg="#4D4D4D"
              text="calculate"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

// import React, { FormEvent } from "react";
// import { StyleSheet, Button, TextInput, View } from "react-native";
// import styles from ".././styles/globalStyles";
// import { Formik, Form } from "formik";
// import FlatButton from "./button.js";
// import NumInput from "./numInput.js";
// import * as yup from "yup";

// // form validation
// // const reviewSchema = yup.object({
// //   base: yup.number().required().max(200),
// //   top: yup
// //     .number()
// //     .required()
// //     .max(200)
// //     .test(
// //       "is-smaller",
// //       "the top diameter must be smaller than the base diameter",
// //       (val) => this.parent.base > val
// //     ),
// //   height: yup.number().required().max(200),
// // });

// // refresh control
// const [refreshing, setRefreshing] = React.useState(false);

// const onRefresh = React.useCallback(() => {
//   setRefreshing(true);
//   setTimeout(() => {
//     setRefreshing(false);
//   }, 250);
// }, []);

// export default function Reviewform({ findNums }) {
//   return (
//     <View>
//       <Formik
//         validationSchema={reviewSchema}
//         initialValues={{ base: "", top: "", height: "" }}
//         onSubmit={(values) => {
//           findNums(values);
//         }}
//       >
//         {(props) => (
//           <View>
//             <NumInput
//               text="Base Diameter (D):"
//               onChangeText={props.handleChange("base")}
//               value={props.values.base}
//               format="cm"
//             />

//             <NumInput
//               text="Top Diameter (d):"
//               onChangeText={props.handleChange("top")}
//               value={props.values.top}
//               format="cm"
//             />

//             <NumInput
//               text="Height (h):"
//               onChangeText={props.handleChange("height")}
//               value={props.values.height}
//               format="m"
//             />

//             <FlatButton
//               bg="#4D4D4D"
//               text="calculate"
//               onPress={props.handleSubmit}
//             />
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
// }

// import React, { FormEvent } from "react";
// import { StyleSheet, Button, TextInput, View} from "react-native";
// import styles from ".././styles/globalStyles";
// import { Formik, Form } from 'formik';
// import FlatButton from './button.js';
// import NumInput from "./numInput.js";

// export default function Reviewform({ findNums }) {

//     // refresh control
//     const [refreshing, setRefreshing] = React.useState(false);

//     const onRefresh = React.useCallback(() => {
//         setRefreshing(true);
//         setTimeout(() => { setRefreshing(false); } , 250);
//     }, []);

//     return(
//         <View>
//             <Formik
//                 initialValues={{base: "", top:"", height: ""}}
//                 onSubmit={(values => {
//                     findNums(values);
//                 })}
//             >

//                 {(props) => (
//                     <View>

//                         <NumInput
//                         text="Base Diameter (D):"
//                         onChangeText={props.handleChange("base")}
//                         value={props.values.base}
//                         format="cm"
//                         />

//                         <NumInput
//                         text="Top Diameter (d):"
//                         onChangeText={props.handleChange("top")}
//                         value={props.values.top}
//                         format="cm"
//                         />

//                         <NumInput
//                         text="Height (h):"
//                         onChangeText={props.handleChange("height")}
//                         value={props.values.height}
//                         format="m"
//                         />

//                         <FlatButton bg="#4D4D4D" text="calculate" onPress={props.handleSubmit}/>

//                     </View>
//                 )}

//             </Formik>
//         </View>
//     )
// }
