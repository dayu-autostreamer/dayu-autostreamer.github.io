"use strict";(self.webpackChunkguide=self.webpackChunkguide||[]).push([[401],{2071:(e,t,a)=>{a.r(t),a.d(t,{default:()=>S});var n=a(6540),l=a(53),o=a(9312),r=a(4676),s=a(4798);const i=function(e){const{metadata:t}=e;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,s.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},n.createElement("div",{className:"pagination-nav__item"},t.previous&&n.createElement(r.A,{className:"pagination-nav__link",to:t.previous.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(s.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")),n.createElement("div",{className:"pagination-nav__label"},"\xab ",t.previous.title))),n.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t.next&&n.createElement(r.A,{className:"pagination-nav__link",to:t.next.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(s.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next")),n.createElement("div",{className:"pagination-nav__label"},t.next.title," \xbb"))))};var c=a(4586),d=a(4098),m=a(9777);const u={unreleased:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(s.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(s.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function p(e){const t=u[e.versionMetadata.banner];return n.createElement(t,e)}function h(e){let{versionLabel:t,to:a,onClick:l}=e;return n.createElement(s.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(r.A,{to:a,onClick:l},n.createElement(s.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function v(e){let{versionMetadata:t}=e;const{siteConfig:{title:a}}=(0,c.A)(),{pluginId:o}=(0,d.vT)({failfast:!0}),{savePreferredVersionName:r}=(0,m.g1)(o),{latestDocSuggestion:s,latestVersionSuggestion:i}=(0,d.HW)(o),u=s??(v=i).docs.find((e=>e.id===v.mainDocId));var v;return n.createElement("div",{className:(0,l.A)(m.GN.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(p,{siteTitle:a,versionMetadata:t})),n.createElement("div",{className:"margin-top--md"},n.createElement(h,{versionLabel:i.label,to:u.path,onClick:()=>r(i.name)})))}const E=function(e){let{versionMetadata:t}=e;return t.banner?n.createElement(v,{versionMetadata:t}):n.createElement(n.Fragment,null)};var b=a(8139);function g(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:a}=e;return n.createElement(s.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:n.createElement("b",null,n.createElement("time",{dateTime:new Date(1e3*t).toISOString()},a))}}," on {date}")}function f(e){let{lastUpdatedBy:t}=e;return n.createElement(s.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:n.createElement("b",null,t)}}," by {user}")}function A(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:a,lastUpdatedBy:l}=e;return n.createElement("span",{className:m.GN.common.lastUpdated},n.createElement(s.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&a?n.createElement(g,{lastUpdatedAt:t,formattedLastUpdatedAt:a}):"",byUser:l?n.createElement(f,{lastUpdatedBy:l}):""}},"Last updated{atDate}{byUser}"),!1)}var N=a(6458),_=a(2853);const C={lastUpdated:"lastUpdated_mt2f"};function k(e){return n.createElement("div",{className:(0,l.A)(m.GN.docs.docFooterTagsRow,"row margin-bottom--sm")},n.createElement("div",{className:"col"},n.createElement(_.A,e)))}function T(e){let{editUrl:t,lastUpdatedAt:a,lastUpdatedBy:o,formattedLastUpdatedAt:r}=e;return n.createElement("div",{className:(0,l.A)(m.GN.docs.docFooterEditMetaRow,"row")},n.createElement("div",{className:"col"},t&&n.createElement(N.A,{editUrl:t})),n.createElement("div",{className:(0,l.A)("col",C.lastUpdated)},(a||o)&&n.createElement(A,{lastUpdatedAt:a,formattedLastUpdatedAt:r,lastUpdatedBy:o})))}function L(e){const{content:t}=e,{metadata:a}=t,{editUrl:o,lastUpdatedAt:r,formattedLastUpdatedAt:s,lastUpdatedBy:i,tags:c}=a,d=c.length>0,u=!!(o||r||i);return d||u?n.createElement("footer",{className:(0,l.A)(m.GN.docs.docFooter,"docusaurus-mt-lg")},d&&n.createElement(k,{tags:c}),u&&n.createElement(T,{editUrl:o,lastUpdatedAt:r,lastUpdatedBy:i,formattedLastUpdatedAt:s})):n.createElement(n.Fragment,null)}var U=a(1461);const y={tocCollapsible:"tocCollapsible_aw-L",tocCollapsibleButton:"tocCollapsibleButton_zr6a",tocCollapsibleContent:"tocCollapsibleContent_0dom",tocCollapsibleExpanded:"tocCollapsibleExpanded_FSiv"};function w(e){let{toc:t,className:a}=e;const{collapsed:o,toggleCollapsed:r}=(0,m.uW)({initialState:!0});return n.createElement("div",{className:(0,l.A)(y.tocCollapsible,{[y.tocCollapsibleExpanded]:!o},a)},n.createElement("button",{type:"button",className:(0,l.A)("clean-btn",y.tocCollapsibleButton),onClick:r},n.createElement(s.A,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page")),n.createElement(m.Nt,{lazy:!0,className:y.tocCollapsibleContent,collapsed:o},n.createElement(U.m,{toc:t})))}var B=a(6287);const M={docItemContainer:"docItemContainer_oiyr",docItemCol:"docItemCol_zHA2",tocMobile:"tocMobile_Tx6Y"};function S(e){const{content:t,versionMetadata:a}=e,{metadata:r,frontMatter:s}=t,{image:c,keywords:d,hide_title:u,hide_table_of_contents:p}=s,{description:h,title:v}=r,g=!u&&void 0===t.contentTitle,f=(0,o.A)(),A=!p&&t.toc&&t.toc.length>0,N=A&&("desktop"===f||"ssr"===f);return n.createElement(n.Fragment,null,n.createElement(b.A,{title:v,description:h,keywords:d,image:c}),n.createElement("div",{className:"row"},n.createElement("div",{className:(0,l.A)("col",{[M.docItemCol]:!p})},n.createElement(E,{versionMetadata:a}),n.createElement("div",{className:M.docItemContainer},n.createElement("article",null,a.badge&&n.createElement("span",{className:(0,l.A)(m.GN.docs.docVersionBadge,"badge badge--secondary")},"Version: ",a.label),A&&n.createElement(w,{toc:t.toc,className:(0,l.A)(m.GN.docs.docTocMobile,M.tocMobile)}),n.createElement("div",{className:(0,l.A)(m.GN.docs.docMarkdown,"markdown")},g&&n.createElement(B.e,null,v),n.createElement(t,null)),n.createElement(L,e)),n.createElement(i,{metadata:r}))),N&&n.createElement("div",{className:"col col--3"},n.createElement(U.A,{toc:t.toc,className:m.GN.docs.docTocDesktop}))))}},6458:(e,t,a)=>{a.d(t,{A:()=>d});var n=a(6540),l=a(4798),o=a(8168),r=a(53);const s="iconEdit_mS5F",i=e=>{let{className:t,...a}=e;return n.createElement("svg",(0,o.A)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,r.A)(s,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};var c=a(9777);function d(e){let{editUrl:t}=e;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:c.GN.common.editThisPage},n.createElement(i,null),n.createElement(l.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},6287:(e,t,a)=>{a.d(t,{e:()=>d,A:()=>m});var n=a(8168),l=a(6540),o=a(53),r=a(4798),s=a(9777);const i="anchorWithStickyNavbar_y2LR",c="anchorWithHideOnScrollNavbar_3ly5",d=function(e){let{...t}=e;return l.createElement("header",null,l.createElement("h1",(0,n.A)({},t,{id:void 0}),t.children))},m=e=>{return"h1"===e?d:(t=e,function(e){let{id:a,...n}=e;const{navbar:{hideOnScroll:d}}=(0,s.pN)();return a?l.createElement(t,n,l.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,o.A)("anchor",`anchor__${t}`,{[c]:d,[i]:!d}),id:a}),n.children,l.createElement("a",{className:"hash-link",href:`#${a}`,title:(0,r.T)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):l.createElement(t,n)});var t}},1461:(e,t,a)=>{a.d(t,{m:()=>p,A:()=>h});var n=a(6540),l=a(53),o=a(9777);function r(e){const t=e.getBoundingClientRect();return t.top===t.bottom?r(e.parentNode):t}function s(e){let{anchorTopOffset:t}=e;const a=Array.from(document.querySelectorAll(".anchor.anchor__h2, .anchor.anchor__h3")),n=a.find((e=>r(e).top>=t));if(n){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(r(n))?n:a[a.indexOf(n)-1]??null}return a[a.length-1]}function i(){const e=(0,n.useRef)(0),{navbar:{hideOnScroll:t}}=(0,o.pN)();return(0,n.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}const c=function(e){const t=(0,n.useRef)(void 0),a=i();(0,n.useEffect)((()=>{const{linkClassName:n,linkActiveClassName:l}=e;function o(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(n),o=s({anchorTopOffset:a.current}),r=e.find((e=>o&&o.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,a){a?(t.current&&t.current!==e&&t.current?.classList.remove(l),e.classList.add(l),t.current=e):e.classList.remove(l)}(e,e===r)}))}return document.addEventListener("scroll",o),document.addEventListener("resize",o),o(),()=>{document.removeEventListener("scroll",o),document.removeEventListener("resize",o)}}),[e,a])},d="tableOfContents_vrFS",m="table-of-contents__link",u={linkClassName:m,linkActiveClassName:"table-of-contents__link--active"};function p(e){let{toc:t,isChild:a}=e;return t.length?n.createElement("ul",{className:a?"":"table-of-contents table-of-contents__left-border"},t.map((e=>n.createElement("li",{key:e.id},n.createElement("a",{href:`#${e.id}`,className:m,dangerouslySetInnerHTML:{__html:e.value}}),n.createElement(p,{isChild:!0,toc:e.children}))))):null}const h=function(e){let{toc:t}=e;return c(u),n.createElement("div",{className:(0,l.A)(d,"thin-scrollbar")},n.createElement(p,{toc:t}))}},3373:(e,t,a)=>{a.d(t,{A:()=>c});var n=a(6540),l=a(53),o=a(4676);const r="tag_WK-t",s="tagRegular_LXbV",i="tagWithCount_S5Zl";const c=function(e){const{permalink:t,name:a,count:c}=e;return n.createElement(o.A,{href:t,className:(0,l.A)(r,{[s]:!c,[i]:c})},a,c&&n.createElement("span",null,c))}},2853:(e,t,a)=>{a.d(t,{A:()=>i});var n=a(6540),l=a(53),o=a(4798),r=a(3373);const s={tags:"tags_NBRY",tag:"tag_F03v"};function i(e){let{tags:t}=e;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(o.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,l.A)(s.tags,"padding--none","margin-left--sm")},t.map((e=>{let{label:t,permalink:a}=e;return n.createElement("li",{key:a,className:s.tag},n.createElement(r.A,{name:t,permalink:a}))}))))}}}]);