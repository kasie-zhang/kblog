---
title: 浏览器是如何运作的？
date: 2021-05-20
cover: /img/cover/84.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- 浏览器
- 前端
publish: true
permalink: /84
---

> 第 84 篇文章
<!-- more -->

# 相关资源

[Life of a Pixel](https://docs.google.com/presentation/d/1boPxbgNrTU0ddsc144rcXayGA_WF53k96imRH8Mp34Y/edit#slide=id.g60f92a5151_40_0)

[Chromium 设计文档](https://www.chromium.org/developers/design-documents)

[正则表达式](http://www.regular-expressions.info/)

[浏览器工作原理](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Painting)

# 浏览器的主要功能

浏览器主要功能是通过向服务器请求并在浏览器窗口中显示它来显示您选择的Web资源。用户使用URL（统一资源标识符）指定资源的位置。

浏览器解释和显示HTML文件的方式在HTML和CSS规范中指定。这些规范由万维网联盟组织维护，该组织是Web的标准组织。多年来，浏览器仅遵循部分规范，并开发自己的扩展程序。

浏览器用户界面彼此之间有很多共同点。常见的用户界面元素包括：

- 用于插入URL的地址栏
- 退后和前进按钮
- 书签选项
- 刷新和停止按钮以刷新或停止当前文档的加载
- 主页按钮，可回到主页

# 浏览器的高级结构

1. **用户界面**：包括地址栏，后退/前进按钮，书签菜单等。浏览器的每个部分都会显示，但您所看到的请求页面的窗口除外。

2. **浏览器引擎**：封送UI和呈现引擎之间的动作。

3. **呈现引擎**：负责显示请求的内容。例如，如果请求的内容是HTML，则呈现引擎解析HTML和CSS，并在屏幕上显示解析的内容。

4. **联网**：用于HTTP请求之类的网络调用，在独立于平台的界面后面针对不同平台使用不同的实现。

5. **UI后端**：用于绘制基本小部件，例如组合框和窗口。该后端公开了不是平台特定的通用接口。它的下面使用操作系统用户界面方法。

6. **JavaScript解释器**：用于解析和执行JavaScript代码。

7. **数据存储**:这是一个持久层。浏览器可能需要在本地保存各种数据，例如cookie。浏览器还支持存储机制，例如localStorage，IndexedDB，WebSQL和FileSystem。

   ![img](/img/2020/front_end_1.png)

注意：Chrome等浏览器运行渲染引擎的多个实例：每个选项卡一个。每个选项卡在单独的过程中运行。

# 渲染引擎

在浏览器屏幕上显示请求的内容。

默认情况下，呈现引擎可以显示HTML和XML文档和图像。它可以通过插件或扩展程序显示其他类型的数据，例如使用PDF查看器插件显示PDF文档。

## 主流程

渲染引擎一开始会从网络层获取请求文档的内容，内容的大小一般限制在8K个块以内。

然后进行以下所示的**基本流程**：

![img](/img/2020/front_end_2.png)

渲染引擎将开始解析HTMl文档，并将各标记逐个转化成“内容树”上的**[DOM](#DOM)结点**。同时也会解析外部CSS文件以及样式元素中的样式数据。HTML中这些带有视觉指令的样式信息将用于创建另一个树结构：“[呈现树](#呈现树的构建)”

呈现树包含多个带有视觉属性（如颜色和尺寸）的矩形。这些矩形的排列顺序就是它们将在屏幕上显示的顺序。

呈现树构建完毕之后，进入“布局”处理阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标。下一个阶段是[绘制](# 绘制) - 呈现引擎会遍历呈现树，由用户界面后端层将每个节点绘制出来。

需要着重指出的是，这是一个渐进的过程。为达到更好的用户体验，呈现引擎会力求尽快将内容显示在屏幕上。它不必等到整个 HTML 文档解析完毕之后，就会开始构建呈现树和设置布局。在不断接收和处理来自网络的其余内容的同时，呈现引擎会将部分内容解析并显示出来。

## 主流程示例

**WebKit 主流程**

![](/img/2020/front_end_3.png)



**Mozilla 的 Gecko 呈现引擎主流程**

![img](/img/2020/front_end_4.png)



## 解析

解析是呈现引擎中非常重要的一个环节，因此我们要更深入地讲解。首先，来介绍一下解析。

解析文档是指将文档转化成为有意义的结构，也就是可让代码理解和使用的结构。解析得到的结果通常是代表了文档结构的节点树，它称作解析树或者语法树。

示例 - 解析 2 + 3 - 1 这个表达式，会返回下面的树：

![img](/img/2020/front_end_5.png)



解析的过程可以分成两个子过程：**词法分析**和**语法分析**。

**词法分析**是将输入内容分割成大量标记的过程。标记是语言中的词汇，即构成内容的单位。在人类语言中，它相当于语言字典中的单词。

**语法分析**是应用语言的语法规则的过程。

解析器通常将解析工作分给以下两个组件来处理：**词法分析器**（有时也称为标记生成器），负责将输入内容分解成一个个有效标记；而**解析器**负责根据语言的语法规则分析文档的结构，从而构建解析树。词法分析器知道如何将无关的字符（比如空格和换行符）分离出来。

从源文档到解析树：

![img](/img/2020/front_end_6.png)

解析是一个迭代的过程。通常，解析器会向词法分析器请求一个新标记，并尝试将其与某条语法规则进行匹配。如果发现了匹配规则，解析器会将一个对应于该标记的节点添加到解析树中，然后继续请求下一个标记。

如果没有规则可以匹配，解析器就会将标记存储到内部，并继续请求标记，直至找到可与所有内部存储的标记匹配的规则。如果找不到任何匹配规则，解析器就会引发一个异常。这意味着文档无效，包含语法错误。

## 翻译

很多时候，解析树还不是最终产品。解析通常是在翻译过程中使用的，而翻译是指**将输入文档转换成另一种格式**。编译就是这样一个例子。编译器可将源代码编译成机器代码，具体过程是首先将源代码解析成解析树，然后将解析树翻译成机器代码文档。

编译流程：

![img](/img/2020/front_end_7.png)



## 解析示例

我们试着定义一个简单的数学语言，用来演示解析的过程。

词汇：我们用的语言可包含整数、加号和减号。

语法：

1. 构成语言的语法单位是表达式、项和运算符。
2. 我们用的语言可以包含任意数量的表达式。
3. 表达式的定义是：一个“项”接一个“运算符”，然后再接一个“项”。
4. 运算符是加号或减号。
5. 项是一个整数或一个表达式。

`让我们分析一下 2 + 3 - 1。`

匹配语法规则的第一个子串是 2，而根据第 5 条语法规则，这是一个项。匹配语法规则的第二个子串是 2 + 3，而根据第 3 条规则（一个项接一个运算符，然后再接一个项），这是一个表达式。下一个匹配项已经到了输入的结束。2 + 3 - 1 是一个表达式，因为我们已经知道 2 + 3 是一个项，这样就符合“一个项接一个运算符，然后再接一个项”的规则。2 + + 不与任何规则匹配，因此是无效的输入。



## 解析算法

HTML无法用常规的自上而下或自下而上的解析器进行解析，原因在于：

- 1.语言的宽容本质
- 浏览器历来对一些常见的无效HTML用法采取包容态度
- 解析过程需要不断地反复。源内容在解析过程中通常不会改变，但是子啊HTML中，脚本标记如果包含document.write，就会添加额外的标记，这样解析过程实际上就更改了输入的内容。

由于不能使用常规的解析技术，浏览器就创建了自定义的解析器来解析HTML。

此算法由两个阶段组成：标记化和树构建。

标记化是词法分析过程，将输入内容解析成多个标记。HTML标记包括起始标记、结束标记、属性名称和属性值。



# DOM

解析器的输出“解析树”是由DOM元素和属性结点构成的树结构。DOM是文档对象模型（Document Objet Model）的缩写。 它是HTML文档的**对象**表示，同时也是外部内容（例如JavaScript）与HTML元素之间的接口。

解析树的根节点是“[Document](w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core.html#i-Document)”对象。

DOM 与标记之间几乎是一一对应的关系。比如下面这段标记：

```html
<html>
  <body>
    <p>
      Hello World
    </p>
    <div> <img src="example.png"/></div>
  </body>
</html>
```

可以翻译成如下的DOM树：

![img](/img/2020/front_end_8.png "示例标记的DOM树")

和HTML一样，DOM也是由W3C组织指定的。参见[www.w3.org/DOM/DOMTR](https://www.w3.org/DOM/DOMTR)。这是关于文档操作的通用规范。其中一个特定模块针对HTML的元素。HTML的定义：[html2.idl](#html2.idl)





# 呈现树的构建



在DOM树构建的同时，浏览器还会构建一个树结构：呈现树。这是由可视化元素按照其显示顺序而组成的树，也是文档的可视化表示。它的作用是让您按照正确的顺序绘制内容。

Firefox 将呈现树中的元素称为“框架”。WebKit 使用的术语是呈现器或呈现对象。

呈现器知道如何布局并将自身及其子元素绘制出来。

WebKits RenderObject 类是所有呈现器的基类，其定义如下：

```c++
class RenderObject{
  virtual void layout();
  virtual void paint(PaintInfo);
  virtual void rect repaintRect();
  Node* node;  //the DOM node
  RenderStyle* style;  // the computed style
  RenderLayer* containgLayer; //the containing z-index layer
}
```

每一个呈现器都代表了一个矩形的区域，通常对应于相关节点的 CSS 框，这一点在 CSS2 规范中有所描述。它包含诸如宽度、高度和位置等几何信息。

框的类型会受到与节点相关的“display”样式属性的影响。下面这段 WebKit 代码描述了根据 display 属性的不同，针对同一个 DOM 节点应创建什么类型的呈现器。

```C++
RenderObject* RenderObject::createObject(Node* node, RenderStyle* style)
{
    Document* doc = node->document();
    RenderArena* arena = doc->renderArena();
    ...
    RenderObject* o = 0;

    switch (style->display()) {
        case NONE:
            break;
        case INLINE:
            o = new (arena) RenderInline(node);
            break;
        case BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case INLINE_BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case LIST_ITEM:
            o = new (arena) RenderListItem(node);
            break;
       ...
    }

    return o;
}
```

元素类型也是考虑因素之一，例如表单控件和表格都对应特殊的框架。

在 WebKit 中，如果一个元素需要创建特殊的呈现器，就会替换 `createRenderer` 方法。呈现器所指向的样式对象中包含了一些和几何无关的信息。


## 呈现树和 DOM 树的关系

呈现器是和 DOM 元素相对应的，但并非一一对应。非可视化的 DOM 元素不会插入呈现树中，例如“head”元素。如果元素的 display 属性值为“none”，那么也不会显示在呈现树中（但是 visibility 属性值为“hidden”的元素仍会显示）。

有一些 DOM 元素对应多个可视化对象。它们往往是具有复杂结构的元素，无法用单一的矩形来描述。例如，“select”元素有 3 个呈现器：一个用于显示区域，一个用于下拉列表框，还有一个用于按钮。如果由于宽度不够，文本无法在一行中显示而分为多行，那么新的行也会作为新的呈现器而添加。

另一个关于多呈现器的例子是格式无效的 HTML。根据 CSS 规范，inline 元素只能包含 block 元素或 inline 元素中的一种。如果出现了混合内容，则应创建匿名的 block 呈现器，以包裹 inline 元素。

有一些呈现对象对应于 DOM 节点，但在树中所在的位置与 DOM 节点不同。浮动定位和绝对定位的元素就是这样，它们处于正常的流程之外，放置在树中的其他地方，并映射到真正的框架，而放在原位的是占位框架。

![markdown](/img/2020/front_end_9.png)

***图：呈现树及其对应的DOM树。初始容器block为“viewport”，而在WebKit中则为“RenderView”对象***


## 呈现树构建的流程

在 Firefox 中，系统会针对 DOM 更新注册展示层，作为侦听器。展示层将框架创建工作委托给 `FrameConstructor`，由该构造器解析样式，并创建框架。

在 WebKit 中，解析样式和创建呈现器的过程称为“附加”。每个 DOM 节点都有一个“attach”方法。附加是同步进行的，将节点插入 DOM 树需要调用新的节点“attach”方法。

处理 html 和 body 标记就会构建呈现树根节点。这个根节点呈现对象对应于 CSS 规范中所说的容器 block，这是最上层的 block，包含了其他所有 block。它的尺寸就是视口，即浏览器窗口显示区域的尺寸。Firefox 称之为 `ViewPortFrame`，而 WebKit 称之为 `RenderView`。这就是文档所指向的呈现对象。呈现树的其余部分以 DOM 树节点插入的形式来构建。

## 样式计算

构建呈现树时，需要计算每一个呈现对象的可视化属性。这是通过计算每个元素的样式属性来完成的。

样式包括来自各种来源的样式表、inline 样式元素和 HTML 中的可视化属性（例如“bgcolor”属性）。其中后者将经过转化以匹配 CSS 样式属性。

样式表的来源包括浏览器的默认样式表、由网页作者提供的样式表以及由浏览器用户提供的用户样式表（浏览器允许您定义自己喜欢的样式。以 Firefox 为例，用户可以将自己喜欢的样式表放在“Firefox Profile”文件夹下）。

**样式计算存在以下难点：**

- 样式数据存储了无数的样式属性，这可能造成内存问题。
- 为每一个元素遍历整个规则表来寻找匹配规则，这是一项浩大的工程。
- 应用规则涉及到相当复杂的层叠规则。

**解决方法：**

- 共享样式数据

  - ```md
    WebKit 节点会引用样式对象 (RenderStyle)。这些对象在某些情况下可以由不同节点共享。这些节点是同级关系，并且：
    
    这些元素必须处于相同的鼠标状态（例如，不允许其中一个是“:hover”状态，而另一个不是）
    任何元素都没有 ID
    标记名称应匹配
    类属性应匹配
    映射属性的集合必须是完全相同的
    链接状态必须匹配
    焦点状态必须匹配
    任何元素都不应受属性选择器的影响，这里所说的“影响”是指在选择器中的任何位置有任何使用了属性选择器的选择器匹配
    元素中不能有任何 inline 样式属性
    不能使用任何同级选择器。WebCore 在遇到任何同级选择器时，只会引发一个全局开关，并停用整个文档的样式共享（如果存在）。这包括 + 选择器以及 :first-child 和 :last-child 等选择器。
    ```

-  Firefox 规则树

  - 为了简化样式计算，Firefox 还采用了另外两种树：规则树和样式上下文树。WebKit 也有样式对象，但它们不是保存在类似样式上下文树这样的树结构中，只是由 DOM 节点指向此类对象的相关样式。

  - ![](/img/2020/front_end_10.png)

  - 样式上下文包含端值。要计算出这些值，应按照正确顺序应用所有的匹配规则，并将其从逻辑值转化为具体的值。例如，如果逻辑值是屏幕大小的百分比，则需要换算成绝对的单位。规则树的点子真的很巧妙，它使得节点之间可以共享这些值，以避免重复计算，还可以节约空间。

    所有匹配的规则都存储在树中。路径中的底层节点拥有较高的优先级。规则树包含了所有已知规则匹配的路径。规则的存储是延迟进行的。规则树不会在开始的时候就为所有的节点进行计算，而是只有当某个节点样式需要进行计算时，才会向规则树添加计算的路径。

  - 这个想法相当于将规则树路径视为词典中的单词。如果我们已经计算出如下的规则树：

  - ![img](/img/2020/front_end_11.png)

  - 假设我们需要为内容树中的另一个元素匹配规则，并且找到匹配路径是 B - E - I（按照此顺序）。由于我们在树中已经计算出了路径 A - B - E - I - L，因此就已经有了此路径，这就减少了现在所需的工作量。


# 绘制
# html2.idl
```C
// File: html2.idl

#ifndef _HTML2_IDL_
#define _HTML2_IDL_

#include "dom.idl"

#pragma prefix "dom.w3c.org"
module html2
{

  typedef dom::DOMString DOMString;
  typedef dom::Node Node;
  typedef dom::Document Document;
  typedef dom::NodeList NodeList;
  typedef dom::Element Element;

  interface HTMLElement;
  interface HTMLFormElement;
  interface HTMLTableCaptionElement;
  interface HTMLTableSectionElement;

  interface HTMLCollection {
    readonly attribute unsigned long   length;
    Node               item(in unsigned long index);
    Node               namedItem(in DOMString name);
  };

  // Introduced in DOM Level 2:
  interface HTMLOptionsCollection {
             attribute unsigned long   length;
                                        // raises(dom::DOMException) on setting

    Node               item(in unsigned long index);
    Node               namedItem(in DOMString name);
  };

  interface HTMLDocument : Document {
             attribute DOMString       title;
    readonly attribute DOMString       referrer;
    readonly attribute DOMString       domain;
    readonly attribute DOMString       URL;
             attribute HTMLElement     body;
    readonly attribute HTMLCollection  images;
    readonly attribute HTMLCollection  applets;
    readonly attribute HTMLCollection  links;
    readonly attribute HTMLCollection  forms;
    readonly attribute HTMLCollection  anchors;
             attribute DOMString       cookie;
                                        // raises(dom::DOMException) on setting

    void               open();
    void               close();
    void               write(in DOMString text);
    void               writeln(in DOMString text);
    NodeList           getElementsByName(in DOMString elementName);
  };

  interface HTMLElement : Element {
             attribute DOMString       id;
             attribute DOMString       title;
             attribute DOMString       lang;
             attribute DOMString       dir;
             attribute DOMString       className;
  };

  interface HTMLHtmlElement : HTMLElement {
             attribute DOMString       version;
  };

  interface HTMLHeadElement : HTMLElement {
             attribute DOMString       profile;
  };

  interface HTMLLinkElement : HTMLElement {
             attribute boolean         disabled;
             attribute DOMString       charset;
             attribute DOMString       href;
             attribute DOMString       hreflang;
             attribute DOMString       media;
             attribute DOMString       rel;
             attribute DOMString       rev;
             attribute DOMString       target;
             attribute DOMString       type;
  };

  interface HTMLTitleElement : HTMLElement {
             attribute DOMString       text;
  };

  interface HTMLMetaElement : HTMLElement {
             attribute DOMString       content;
             attribute DOMString       httpEquiv;
             attribute DOMString       name;
             attribute DOMString       scheme;
  };

  interface HTMLBaseElement : HTMLElement {
             attribute DOMString       href;
             attribute DOMString       target;
  };

  interface HTMLIsIndexElement : HTMLElement {
    readonly attribute HTMLFormElement form;
             attribute DOMString       prompt;
  };

  interface HTMLStyleElement : HTMLElement {
             attribute boolean         disabled;
             attribute DOMString       media;
             attribute DOMString       type;
  };

  interface HTMLBodyElement : HTMLElement {
             attribute DOMString       aLink;
             attribute DOMString       background;
             attribute DOMString       bgColor;
             attribute DOMString       link;
             attribute DOMString       text;
             attribute DOMString       vLink;
  };

  interface HTMLFormElement : HTMLElement {
    readonly attribute HTMLCollection  elements;
    readonly attribute long            length;
             attribute DOMString       name;
             attribute DOMString       acceptCharset;
             attribute DOMString       action;
             attribute DOMString       enctype;
             attribute DOMString       method;
             attribute DOMString       target;
    void               submit();
    void               reset();
  };

  interface HTMLSelectElement : HTMLElement {
    readonly attribute DOMString       type;
             attribute long            selectedIndex;
             attribute DOMString       value;
    // Modified in DOM Level 2:
             attribute unsigned long   length;
                                        // raises(dom::DOMException) on setting

    readonly attribute HTMLFormElement form;
    // Modified in DOM Level 2:
    readonly attribute HTMLOptionsCollection options;
             attribute boolean         disabled;
             attribute boolean         multiple;
             attribute DOMString       name;
             attribute long            size;
             attribute long            tabIndex;
    void               add(in HTMLElement element, 
                           in HTMLElement before)
                                        raises(dom::DOMException);
    void               remove(in long index);
    void               blur();
    void               focus();
  };

  interface HTMLOptGroupElement : HTMLElement {
             attribute boolean         disabled;
             attribute DOMString       label;
  };

  interface HTMLOptionElement : HTMLElement {
    readonly attribute HTMLFormElement form;
    // Modified in DOM Level 2:
             attribute boolean         defaultSelected;
    readonly attribute DOMString       text;
    // Modified in DOM Level 2:
    readonly attribute long            index;
             attribute boolean         disabled;
             attribute DOMString       label;
             attribute boolean         selected;
             attribute DOMString       value;
  };

  interface HTMLInputElement : HTMLElement {
             attribute DOMString       defaultValue;
             attribute boolean         defaultChecked;
    readonly attribute HTMLFormElement form;
             attribute DOMString       accept;
             attribute DOMString       accessKey;
             attribute DOMString       align;
             attribute DOMString       alt;
             attribute boolean         checked;
             attribute boolean         disabled;
             attribute long            maxLength;
             attribute DOMString       name;
             attribute boolean         readOnly;
    // Modified in DOM Level 2:
             attribute unsigned long   size;
             attribute DOMString       src;
             attribute long            tabIndex;
    // Modified in DOM Level 2:
             attribute DOMString       type;
             attribute DOMString       useMap;
             attribute DOMString       value;
    void               blur();
    void               focus();
    void               select();
    void               click();
  };

  interface HTMLTextAreaElement : HTMLElement {
    // Modified in DOM Level 2:
             attribute DOMString       defaultValue;
    readonly attribute HTMLFormElement form;
             attribute DOMString       accessKey;
             attribute long            cols;
             attribute boolean         disabled;
             attribute DOMString       name;
             attribute boolean         readOnly;
             attribute long            rows;
             attribute long            tabIndex;
    readonly attribute DOMString       type;
             attribute DOMString       value;
    void               blur();
    void               focus();
    void               select();
  };

  interface HTMLButtonElement : HTMLElement {
    readonly attribute HTMLFormElement form;
             attribute DOMString       accessKey;
             attribute boolean         disabled;
             attribute DOMString       name;
             attribute long            tabIndex;
    readonly attribute DOMString       type;
             attribute DOMString       value;
  };

  interface HTMLLabelElement : HTMLElement {
    readonly attribute HTMLFormElement form;
             attribute DOMString       accessKey;
             attribute DOMString       htmlFor;
  };

  interface HTMLFieldSetElement : HTMLElement {
    readonly attribute HTMLFormElement form;
  };

  interface HTMLLegendElement : HTMLElement {
    readonly attribute HTMLFormElement form;
             attribute DOMString       accessKey;
             attribute DOMString       align;
  };

  interface HTMLUListElement : HTMLElement {
             attribute boolean         compact;
             attribute DOMString       type;
  };

  interface HTMLOListElement : HTMLElement {
             attribute boolean         compact;
             attribute long            start;
             attribute DOMString       type;
  };

  interface HTMLDListElement : HTMLElement {
             attribute boolean         compact;
  };

  interface HTMLDirectoryElement : HTMLElement {
             attribute boolean         compact;
  };

  interface HTMLMenuElement : HTMLElement {
             attribute boolean         compact;
  };

  interface HTMLLIElement : HTMLElement {
             attribute DOMString       type;
             attribute long            value;
  };

  interface HTMLDivElement : HTMLElement {
             attribute DOMString       align;
  };

  interface HTMLParagraphElement : HTMLElement {
             attribute DOMString       align;
  };

  interface HTMLHeadingElement : HTMLElement {
             attribute DOMString       align;
  };

  interface HTMLQuoteElement : HTMLElement {
             attribute DOMString       cite;
  };

  interface HTMLPreElement : HTMLElement {
             attribute long            width;
  };

  interface HTMLBRElement : HTMLElement {
             attribute DOMString       clear;
  };

  interface HTMLBaseFontElement : HTMLElement {
             attribute DOMString       color;
             attribute DOMString       face;
    // Modified in DOM Level 2:
             attribute long            size;
  };

  interface HTMLFontElement : HTMLElement {
             attribute DOMString       color;
             attribute DOMString       face;
             attribute DOMString       size;
  };

  interface HTMLHRElement : HTMLElement {
             attribute DOMString       align;
             attribute boolean         noShade;
             attribute DOMString       size;
             attribute DOMString       width;
  };

  interface HTMLModElement : HTMLElement {
             attribute DOMString       cite;
             attribute DOMString       dateTime;
  };

  interface HTMLAnchorElement : HTMLElement {
             attribute DOMString       accessKey;
             attribute DOMString       charset;
             attribute DOMString       coords;
             attribute DOMString       href;
             attribute DOMString       hreflang;
             attribute DOMString       name;
             attribute DOMString       rel;
             attribute DOMString       rev;
             attribute DOMString       shape;
             attribute long            tabIndex;
             attribute DOMString       target;
             attribute DOMString       type;
    void               blur();
    void               focus();
  };

  interface HTMLImageElement : HTMLElement {
             attribute DOMString       name;
             attribute DOMString       align;
             attribute DOMString       alt;
             attribute DOMString       border;
    // Modified in DOM Level 2:
             attribute long            height;
    // Modified in DOM Level 2:
             attribute long            hspace;
             attribute boolean         isMap;
             attribute DOMString       longDesc;
             attribute DOMString       src;
             attribute DOMString       useMap;
    // Modified in DOM Level 2:
             attribute long            vspace;
    // Modified in DOM Level 2:
             attribute long            width;
  };

  interface HTMLObjectElement : HTMLElement {
    readonly attribute HTMLFormElement form;
             attribute DOMString       code;
             attribute DOMString       align;
             attribute DOMString       archive;
             attribute DOMString       border;
             attribute DOMString       codeBase;
             attribute DOMString       codeType;
             attribute DOMString       data;
             attribute boolean         declare;
             attribute DOMString       height;
             attribute long            hspace;
             attribute DOMString       name;
             attribute DOMString       standby;
             attribute long            tabIndex;
             attribute DOMString       type;
             attribute DOMString       useMap;
             attribute long            vspace;
             attribute DOMString       width;
    // Introduced in DOM Level 2:
    readonly attribute Document        contentDocument;
  };

  interface HTMLParamElement : HTMLElement {
             attribute DOMString       name;
             attribute DOMString       type;
             attribute DOMString       value;
             attribute DOMString       valueType;
  };

  interface HTMLAppletElement : HTMLElement {
             attribute DOMString       align;
             attribute DOMString       alt;
             attribute DOMString       archive;
             attribute DOMString       code;
             attribute DOMString       codeBase;
             attribute DOMString       height;
    // Modified in DOM Level 2:
             attribute long            hspace;
             attribute DOMString       name;
    // Modified in DOM Level 2:
             attribute DOMString       object;
    // Modified in DOM Level 2:
             attribute long            vspace;
             attribute DOMString       width;
  };

  interface HTMLMapElement : HTMLElement {
    readonly attribute HTMLCollection  areas;
             attribute DOMString       name;
  };

  interface HTMLAreaElement : HTMLElement {
             attribute DOMString       accessKey;
             attribute DOMString       alt;
             attribute DOMString       coords;
             attribute DOMString       href;
             attribute boolean         noHref;
             attribute DOMString       shape;
             attribute long            tabIndex;
             attribute DOMString       target;
  };

  interface HTMLScriptElement : HTMLElement {
             attribute DOMString       text;
             attribute DOMString       htmlFor;
             attribute DOMString       event;
             attribute DOMString       charset;
             attribute boolean         defer;
             attribute DOMString       src;
             attribute DOMString       type;
  };

  interface HTMLTableElement : HTMLElement {
    // Modified in DOM Level 2:
             attribute HTMLTableCaptionElement caption;
                                        // raises(dom::DOMException) on setting

    // Modified in DOM Level 2:
             attribute HTMLTableSectionElement tHead;
                                        // raises(dom::DOMException) on setting

    // Modified in DOM Level 2:
             attribute HTMLTableSectionElement tFoot;
                                        // raises(dom::DOMException) on setting

    readonly attribute HTMLCollection  rows;
    readonly attribute HTMLCollection  tBodies;
             attribute DOMString       align;
             attribute DOMString       bgColor;
             attribute DOMString       border;
             attribute DOMString       cellPadding;
             attribute DOMString       cellSpacing;
             attribute DOMString       frame;
             attribute DOMString       rules;
             attribute DOMString       summary;
             attribute DOMString       width;
    HTMLElement        createTHead();
    void               deleteTHead();
    HTMLElement        createTFoot();
    void               deleteTFoot();
    HTMLElement        createCaption();
    void               deleteCaption();
    // Modified in DOM Level 2:
    HTMLElement        insertRow(in long index)
                                        raises(dom::DOMException);
    // Modified in DOM Level 2:
    void               deleteRow(in long index)
                                        raises(dom::DOMException);
  };

  interface HTMLTableCaptionElement : HTMLElement {
             attribute DOMString       align;
  };

  interface HTMLTableColElement : HTMLElement {
             attribute DOMString       align;
             attribute DOMString       ch;
             attribute DOMString       chOff;
             attribute long            span;
             attribute DOMString       vAlign;
             attribute DOMString       width;
  };

  interface HTMLTableSectionElement : HTMLElement {
             attribute DOMString       align;
             attribute DOMString       ch;
             attribute DOMString       chOff;
             attribute DOMString       vAlign;
    readonly attribute HTMLCollection  rows;
    // Modified in DOM Level 2:
    HTMLElement        insertRow(in long index)
                                        raises(dom::DOMException);
    // Modified in DOM Level 2:
    void               deleteRow(in long index)
                                        raises(dom::DOMException);
  };

  interface HTMLTableRowElement : HTMLElement {
    // Modified in DOM Level 2:
    readonly attribute long            rowIndex;
    // Modified in DOM Level 2:
    readonly attribute long            sectionRowIndex;
    // Modified in DOM Level 2:
    readonly attribute HTMLCollection  cells;
             attribute DOMString       align;
             attribute DOMString       bgColor;
             attribute DOMString       ch;
             attribute DOMString       chOff;
             attribute DOMString       vAlign;
    // Modified in DOM Level 2:
    HTMLElement        insertCell(in long index)
                                        raises(dom::DOMException);
    // Modified in DOM Level 2:
    void               deleteCell(in long index)
                                        raises(dom::DOMException);
  };

  interface HTMLTableCellElement : HTMLElement {
    readonly attribute long            cellIndex;
             attribute DOMString       abbr;
             attribute DOMString       align;
             attribute DOMString       axis;
             attribute DOMString       bgColor;
             attribute DOMString       ch;
             attribute DOMString       chOff;
             attribute long            colSpan;
             attribute DOMString       headers;
             attribute DOMString       height;
             attribute boolean         noWrap;
             attribute long            rowSpan;
             attribute DOMString       scope;
             attribute DOMString       vAlign;
             attribute DOMString       width;
  };

  interface HTMLFrameSetElement : HTMLElement {
             attribute DOMString       cols;
             attribute DOMString       rows;
  };

  interface HTMLFrameElement : HTMLElement {
             attribute DOMString       frameBorder;
             attribute DOMString       longDesc;
             attribute DOMString       marginHeight;
             attribute DOMString       marginWidth;
             attribute DOMString       name;
             attribute boolean         noResize;
             attribute DOMString       scrolling;
             attribute DOMString       src;
    // Introduced in DOM Level 2:
    readonly attribute Document        contentDocument;
  };

  interface HTMLIFrameElement : HTMLElement {
             attribute DOMString       align;
             attribute DOMString       frameBorder;
             attribute DOMString       height;
             attribute DOMString       longDesc;
             attribute DOMString       marginHeight;
             attribute DOMString       marginWidth;
             attribute DOMString       name;
             attribute DOMString       scrolling;
             attribute DOMString       src;
             attribute DOMString       width;
    // Introduced in DOM Level 2:
    readonly attribute Document        contentDocument;
  };
};

#endif // _HTML2_IDL_
```
