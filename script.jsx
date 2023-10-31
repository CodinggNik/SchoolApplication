import { useState, useEffect} from "react";


import { Sidebar } from "./SidebarAdmin"

export default function AdminView() {
    const Fächer = ["Deutsch", "Mathe", "Physik"]

    const [RenderSettings, SetRenderSettings] = useState(1);
    const [SelectedFächer, setSelctedFächer] = useState([]);
    const [ShowPasswort, setShowPassword] = useState(false)


    const [SchoolData, SetSchoolData] = useState({
        Accounts:{
            owner: { name: "Niklas Zimmermann", password:"Passwort1"},


            admins: {
                1:{ name: "finn olbrich", number:1, 
                    Fächer:["Mathe", "Physik"]
                  ,password:"Passwort2"},
    
                2:{ name: "patrice gilles", number:2,
                    Fächer:["Deutsch"],
                  password:"Passwort3"}


        }
        }})

        



    function mergeLists(list1, list2) {
      if(Array.isArray(list2)){
        const mergedList = [...list1, ...list2];

        const uniqueList = mergedList.filter((item, index) => mergedList.indexOf(item) === index);
        return uniqueList;
      }else {
        const mergedList = [...list1, list2]

        const uniqueList = mergedList.filter((item, index) => mergedList.indexOf(item) === index);
        return uniqueList;
      }
      
    }


    function AppSubjects(){
      SetSchoolData((OldSchoolData) => {
        const OldFächer = OldSchoolData.Accounts.admins[1].Fächer
        const SavedFächer = mergeLists(OldFächer, SelectedFächer)
        OldSchoolData.Accounts.admins[RenderSettings].Fächer = SavedFächer


        return OldSchoolData
      })
      setSelctedFächer([])
    }

    function RemoveSubjects(){
      SetSchoolData((OldSchoolData) => {
        const OldFächer = OldSchoolData.Accounts.admins[1].Fächer
        const AbzugFächer = SelectedFächer
        const newFächer = OldFächer.filter((Fach)  => !AbzugFächer.includes(Fach))
        
        
        OldSchoolData.Accounts.admins[1].Fächer = newFächer
        return OldSchoolData
      })
    }



    function RenderCustomPromtAddableFächer(){
        const TakenFächer = [...SchoolData.Accounts.admins[RenderSettings].Fächer]
        const TheFächer = [...Fächer.filter((element) => !SelectedFächer.includes(element))] //The Fächer = alle Fächer ohne die bereits ausgewählten
        const OptionFächer = TheFächer.filter(Fach => !TakenFächer.includes(Fach))
        return OptionFächer.map((fach, index) => (
          <option key={index} value={fach}>{fach}</option>
        ));
      }

        
    function RenderCustomPromptRemovableFächer(){
      const TakenFächer = [...SchoolData.Accounts.admins[RenderSettings].Fächer]
      const TheFächer = [...Fächer.filter((element) => !SelectedFächer.includes(element))] //The Fächer = alle Fächer ohne die bereits ausgewählten
      const OptionFächer = TheFächer.filter((element) => TakenFächer.includes(element));
      return OptionFächer.map((fach, index) => (
        <option key={index} value={fach}>{fach}</option>
      ))}     
    


    function RenderCustumPromptChoosenSubjects() {
        const Fächer = SelectedFächer;

        if (!Array.isArray(Fächer)) {
          return <h4>Es ist ein Fehler aufgetreten</h4>;
        }
        return (
          <ul className="NoListPoint">
            {Fächer.map((Fach, index) => (
              <li key={index}>{Fach}</li>
            ))}
          </ul>
        );
      }

    

    
    function openCustomPrompt(Prompt) {
        var customPrompt = document.getElementById(Prompt);
        customPrompt.style.display = "flex";
    }

    function closeCustomPrompt(Prompt) {
        var customPrompt = document.getElementById(Prompt);
        customPrompt.style.display = "none";
    }



    function RenderRightSide(){
        if((true)){
            return <RenderSetting></RenderSetting>
        }else {
            return <div>
                <h2>doesnt render</h2>
            </div>
        }
    }


    function RenderSetting(){
        return <div>
                    <div>
                        <h2>Umbenenen</h2>
                    </div>
                    <div>
                        <button
                        onClick={() => {
                            openCustomPrompt("customPromptFächerAdd")
                        }}>
                            <h2>Fächer hizufügen</h2>
                        </button>
                        
                    </div>
                    <div>
                        <button
                        onClick={() => {
                          openCustomPrompt("customPromptFächerRemove")
                        }}>Fächer löschen</button>
                    </div>
                    <div>
                        <button
                        onClick={() => {
                          openCustomPrompt("customPromptChangePasswort")
                        }}>Passwort ändern</button>
                    </div>
                    <div>
                        <button onClick={() => {
                          openCustomPrompt("customPromptDeleteAccount")
                        }}>Löschen</button>
                    </div>
                    <div>
                      <button onClick={() => {
                        SetSchoolData((OldData) => {
                          OldData.Accounts.admins = {1:{
                            name: "finn olbrich", number:1, 
                            Fächer:["Mathe", "Physik"]
                          ,password:"Passwort2"}
                          }
                          return OldData
                        })
                      }}>Neuer Admin</button>
                    </div>
                    <div><button
                    onClick={
                      () => {
                        console.log(SchoolData.Accounts.admins)
                      }
                    }>Log</button></div>
                </div>
    }
    function openSetting(choise){
        SetRenderSettings(choise)
    }


    
    function RenderAdminsList(){
      useEffect(() => {
        
    }, [SchoolData.Accounts.admins[RenderSettings]])



        return (<>
             <ul id="AdminListUl">
                <li key={"owner"} className="ListItem">
                    <p className="listname">{SchoolData.Accounts.owner.name}</p>
                    <button className="listsetting"
                    onClick={() => 
                        {openSetting("Owner")}}
                    >Einstellungen</button>
                </li>   
                {Object.values(SchoolData.Accounts.admins).map((admin) => (
                  <li key={admin.number} className="ListItem">
                      <p className="listname">{admin.name}</p>
                      <button className="listsetting"
                      onClick={() => 
                      {openSetting(admin.number)}}
                      >Einstellungen</button>
                  </li>))}
            </ul>
        </>)
        }

       

        function ShowTextOrPoints(){
          if(ShowPasswort){return "text"
        }else{return "password"}
        }






        return(
            <>
                <div className="sidebar">
                  <Sidebar></Sidebar>
                </div>
                <div id="pageContent">
    
                    <header>
                        <h1 id="überschrieft">Admins</h1>
                    </header>
                    <main id="PageContentMain">
                        <div id="AdminListDiv">
                            <h2>AdminList</h2>
                            <div id="AdminList">
                                <RenderAdminsList></RenderAdminsList>
                            </div>
                        </div>
                        <div id="PageContentRight">
                            <RenderRightSide></RenderRightSide>
                        </div>
                    </main>
                </div>
    






                {/*                    CustomPrompt                    */}
                {/*----------------------------------------------------*/}
                <div id="customPromptFächerAdd" className="custom-prompt">
                  <div className="prompt-content">
                    <div id="AddFach">
                      {/*----------------Ober Zeile---------------*/}
                      <h2>Fächer hinzufügen</h2>


                      <label htmlFor="schulfach">Schulfach auswählen:</label>
                      <select name="schulfach" id="SchulfachSelector">
                      <RenderCustomPromtAddableFächer/>
                      </select>


                      <button
                        onClick={() => {  
                          const Fach = document.getElementById("SchulfachSelector").value;
                          setSelctedFächer((OldFächer) => [...OldFächer, Fach]);
                          }}>
                          Fach hinzufügen
                          </button>
                        </div>
                        {/*--------------Untere Zeile*/}
                        <div id="CustumPromptChoosenSubjectDiv">
                          {RenderCustumPromptChoosenSubjects()}
                        </div>
                        <div className="CustonPromtContainerButtons">
                          <button className="CustonPromtContainerButton" onClick={() => {
                            closeCustomPrompt("customPromptFächerAdd");
                            setSelctedFächer([]);
                                 }}>
                                   Abbrechen
                                 </button>
                                 <button className="CustonPromtContainerButton"
                                   onClick={() => {
                                     AppSubjects()
                                 }}>Speicher</button>
                               </div>
                             </div>
                </div>



      {/*___________________Remove Subjects9____________________*/}
      <div id="customPromptFächerRemove" className="custom-prompt">
        <div className="prompt-content">
          <div id="AddFach">
            <h2>Fächer löschen</h2>
            <div>
              <label htmlFor="schulfach">Schulfach auswählen:</label>
                <select name="schulfach" id="SchulfachSelectorDelete">
                <RenderCustomPromptRemovableFächer/>
                </select>
                <button
                  onClick={() => {
                    const NewSelectedFächer = document.getElementById("SchulfachSelectorDelete").value
                    setSelctedFächer((OldFächer) => [...OldFächer, NewSelectedFächer])
                  }}>
                  Fach hinzufügen
                </button>
              </div>
              <div className="CustumPromptChoosenSubjectDiv">
                	<RenderCustumPromptChoosenSubjects></RenderCustumPromptChoosenSubjects>


                <div className="CustonPromtContainerButtons">
                  <button className="CustonPromtContainerButton"
                  onClick={() => {
                    closeCustomPrompt("customPromptFächerRemove")
                    setSelctedFächer([])
                  }}>Abbrechen</button>
                  <button className="CustonPromtContainerButton"
                  onClick={() => {
                    RemoveSubjects()
                    closeCustomPrompt("customPromptFächerRemove")
                    setSelctedFächer([])
                  }}>Speichern</button>
                </div>
                <div>
                  <div  id="CustumPromptChoosenSubjectDiv">
                    
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>



      {/*________________________change Password__________________________*/}
      <div id="customPromptChangePasswort" className="custom-prompt">
        <div className="prompt-content">
          <div id="AddFach">
            <h2>Passwort ändern</h2>
                <div>
                  <div>
                    <input type={ShowTextOrPoints()} id="OldPassword" value={SchoolData.Accounts.admins[RenderSettings].password} readOnly/>
                    <button
                    onClick={() => {
                    if(ShowPasswort == true){setShowPassword(false)
                    }else{setShowPassword(true)}
                  }}>Passwort anzeigen</button>
                  </div>
                  <div>
                    <input type="text" id="NewPassword"/>
                  </div>
                  <div>
                    <button onClick={() => {
                      closeCustomPrompt("customPromptChangePasswort")
                      setShowPassword(false)
                    }}>Schließen</button>
                    <button onClick={() => {
                      closeCustomPrompt("customPromptChangePasswort")
                      setShowPassword(false)

                      {/*----In Daten übertragen*/}
                      SetSchoolData((OldSchoolData) => {
                        const NewPassword = document.getElementById("NewPassword").value
                        OldSchoolData.Accounts.admins[RenderSettings].password = NewPassword

                        


                        return OldSchoolData})
                        
                      //Input leeren
                      document.getElementById("OldPassword").value = SchoolData.Accounts.admins[RenderSettings].password
                      document.getElementById("NewPassword").value = ""
                    }
                    
                    }>Speichern</button>
                  </div>
                </div>
          </div>
        </div>
      </div>



      <div id="customPromptDeleteAccount" className="custom-prompt">
        <div className="prompt-content">
          <div><h2>Willst du den Account wirklich löschen?</h2></div>
          <div>
            <button className="classDeleteAccountButton"
            onClick={() => {closeCustomPrompt("customPromptDeleteAccount")}}>Abbrechen</button>


            <button className="classDeleteAccountButton"
            onClick={() => {
              closeCustomPrompt("customPromptDeleteAccount")
              const NewSchoolData = SchoolData
              delete NewSchoolData.Accounts.admins[RenderSettings]
              SetSchoolData(NewSchoolData)
              
              SetRenderSettings(RenderSettings)
              console.log(SchoolData.Accounts)
            }}>Löschen</button>
            <div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}


