import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Register from "./components/register";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Profile from "./components/Profile";
import { Provider, useDispatch } from "react-redux";
import { auth } from "./config/firebase";
import { useEffect } from "react";
import store from "./store/store";
import { login, logout } from "./store/authSlice";

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (userDetails) => {
      if (userDetails) {
        dispatch(login({ 
          uid: userDetails.uid,
          email: userDetails.email,
          name: userDetails.displayName,
          photo: userDetails.photoURL
         }));
      } else {
        dispatch(logout());
      }

      setLoading(false);
    });
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return !loading ? (
    <>
        <ToastContainer />
        {/* <Editor
      apiKey='zzzmfv2iwdajtn2b0n0z79a4s214fimoi5oj77tsvfpr1dh5'
      init={{
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Sep 19, 2025:
          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        uploadcare_public_key: 'ae091b2fd8c9fba5c12f',
      }}
      initialValue=""
    /> */}

        {/* <Register/> */}
        {/* <Login/> */}
        <RouterProvider router={router} />
    </>
  ) : null
}
