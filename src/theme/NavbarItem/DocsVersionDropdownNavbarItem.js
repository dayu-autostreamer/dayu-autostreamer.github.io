import React from 'react';
import OriginalVersionDropdown from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';

export default function DocsVersionDropdownNavbarItem(props) {
    const {activeDoc} = useActiveDocContext('community');
    return activeDoc ? null : <OriginalVersionDropdown {...props} />;
}
