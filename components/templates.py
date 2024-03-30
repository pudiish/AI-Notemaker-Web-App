import streamlit as st

# grid layout component one card consist of 1 img and 1 text
def grid_layout():
    lst=[1,2,3,4,5,6,7,8,9]
    row = st.columns(3)
    col = st.columns(3)
    for i in range(9):
        with row[i%3]:
            st.image("https://via.placeholder.com/150", width=200)
            st.write(f"Card {lst[i]}")
    


        


