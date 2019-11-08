import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  title: {
    color: 'black',
    margin: theme.spacing(4),
  },
  body:{
    color: 'black',
    marginLeft: theme.spacing(6),
  },
  expansionPanel:{
    marginLeft: theme.spacing(6),
  },
  detail:{
    color: 'black',
    marginLeft: theme.spacing(2),
  }
}))

export default function ManagementPortal(){
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <React.Fragment>
      <Typography variant="h4" color="textSecondary" component="h1" className={classes.title}>
        HELP
      </Typography>

      <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
        動画を視聴するには
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
        動画は自動的にフォルダ分けされています。画面左側のメニューから見たいフォルダを探してください。
        フォルダをクリックするとそのフォルダに含まれる動画が一覧表示されます。
        動画一覧から、みたい動画の「Watch」ボタンをクリックすることで動画を視聴することができます。
      </Typography>

      <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
        ユーザー認証について
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
        ユーザー認証には現在Googleアカウントのみ使用することができます。利用開始には管理者による承認が必要となります。
      </Typography>

      <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
        検索機能
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
        検索ボックスにチーム名や大会名、部門名、所属団体名、日付などを入力することで検索することができます。
        複数のキーワードを指定する場合はスペースで区切ってください。
        日付は"2019-9-20"や"2019/9/20"のようにハイフンやスラッシュで区切ってください。
        より詳しい検索を実装中です。
      </Typography>

      <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
        お気に入り機能
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
        ハートマークをクリック（またはタップ）することで動画をお気に入り登録することができます。
        お気に入り登録した動画は画面左側のメニュー内にある「Favorite」ファイルからまとめて見ることができます。
      </Typography>

      <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
        共有機能
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
        リンクマークをクリック（またはタップ）することで動画をシェアすることができます。現在はURLのコピーのみ対応しています。
      </Typography>

      <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
        閲覧履歴（未実装）
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
        閲覧履歴を見るには、画面左側のメニュー内にある「Watch History」ファイルからまとめて見ることができます。現在調整中です。
      </Typography>

      <Typography variant="h4" color="textSecondary" component="h1" className={classes.title}>
        FAQ
      </Typography>

      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.expansionPanel}>
        <ExpansionPanelSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Q. 画面左側にメニューが表示されない</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.detail}>
            A. 画面左上のハンバーガーアイコン（横三本線）をクリックすることでメニューの表示/非表示を切り替えることができます
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  )
}
