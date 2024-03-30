import streamlit as st
from components.templates import grid_layout

def main():
    title=st.title("Jugad Notes")
    st.write("This is a Jugadu Note taking app!")

    st.markdown(
    """
    <style>
        [data-testid=stSidebar] {
            text-align: center;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
    """, unsafe_allow_html=True
    )
    st.sidebar.title("Menu")
    # width of side bar 300px
    
    
    add_notes_clicked = st.sidebar.button("Add Notes", type="primary")
    
    # add notes button
    if add_notes_clicked:
        title.title("Select Template")
        grid_layout()
    
    # view notes button
    if st.sidebar.button("View Notes",):
        
        st.write("Your notes:")
        notes = []
        for i in range(1, 6):
            note = st.text_area(f"Note {i}")
            notes.append(note)
        st.write(notes)
    
    # delete notes button
    if st.sidebar.button("Delete Notes"):
        st.warning("All notes will be deleted!")
        if st.button("Confirm"):
            st.success("All notes deleted!")
        else:
            st.info("Deletion cancelled!")
        

if __name__ == "__main__":
    main()


