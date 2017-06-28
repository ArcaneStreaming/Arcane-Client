import React from 'react';
import {AutoComplete, IconButton} from 'material-ui'

const SearchBox = (props) => {

    const baseStyles = {
        open: {
            width:'inherit',
            minWidth:'30vw',
            maxWidth:'50vw'
        },
        closed: {
            width: 0
        },
        smallIcon: {
            width: 30,
            height: 30
        },
        icon: {
            width: 40,
            height: 40,
            padding: 5,
            top: 7,
            float:'right'
        },
        frame: {
            float:'left',
            width:'inherit',
            display:'inline-flex'
        }
    };
   const textStyle = props.isOpen ? baseStyles.open : baseStyles.closed;
   const divStyle = Object.assign({}, textStyle, baseStyles.frame);
       divStyle.width += baseStyles.icon.width + 5;
   const dataSourceConfig = {
         text: 'name',
         value: 'id'
       };
   return (
     <div
       id="searchBox"
       style={divStyle}
     ><AutoComplete
       dataSource={props.dataSource ? props.dataSource : fruit}
       dataSourceConfig={dataSourceConfig}
       filter={AutoComplete.fuzzyFilter}
       fullWidth
       id={'searchField'}
       menuProps={{maxHeight:'75vh'}}
       onUpdateInput={props.onUpdate}
       style={textStyle}
      />
       <IconButton
         iconClassName="material-icons"
         iconStyle={{color: props.muiTheme.palette.alternateTextColor}}
         onClick={() => props.onClick()}
       >{"search"}</IconButton>
     </div>
    );
};
export default SearchBox;
