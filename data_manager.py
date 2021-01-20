from psycopg2.extras import RealDictCursor
import database_common


@database_common.connection_handler
def get_scoreboard(cursor: RealDictCursor):
    """
    Read answers for specific question.
    :param cursor: RealDictCursor
    :return: scoreboard -> list
    """
    query = """ SELECT *
            FROM scoreboard
            ORDER BY points DESC
            """
    cursor.execute(query)
    return cursor.fetchall()

@database_common.connection_handler
def save_score(cursor: RealDictCursor, nickname, score):
    """
    :param cursor: RealDictCursor
    :param nickname: string
    :param score: int
    :return: None
    """
    query = """ INSERT INTO scoreboard ( nick, game_date, points) 
        VALUES (%s, (SELECT current_timestamp(0)), %s)
            """
    cursor.execute(query, (nickname, score))
